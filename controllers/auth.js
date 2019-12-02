const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { errorHandler } = require('../libs/error');
const { sendVerificationEmail, resendVerificationEmail } = require('../services/emails');
const { isEmpty, isEmail, isContact } = require('../libs/validator');
const User = require('../models/users');
const Token = require('../models/tokens');
const crypto = require('crypto');
const { JWT_SECRET } = process.env;

const signup = async function(req, res) {
	try {
		const { password, email, contact } = req.body;
		if (!isEmpty(req.body)) {
			throw new Error('all fields are mendatory');
		}
		if (!isEmail(email)) {
			throw new Error(`${email} is not a valid email address`);
		}
		if (!isContact(contact)) {
			throw new Error(`${contact} is not a valid contact number`);
		}
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(password, salt);
		req.body.password = hash;
		const user = await User.create(req.body);
		const buffer = crypto.randomBytes(3);
		const token = parseInt(buffer.toString('hex'), 16)
			.toString()
			.substr(0, 6);
		await Token.create({ user: user._id, token: token });
		let res = await sendVerificationEmail({ user, token });
		return res.json({
			success: true,
			message: `verification email sent to ${email}.`
		});
	} catch (err) {
		return errorHandler(err, res, 500);
	}
};

const signin = async function(req, res) {
	try {
		let { contact, password } = req.body;
		const user = await User.findOne({ contact });
		if (!user) throw Error('user not found');
		const passwordMatched = await bcrypt.compareSync(password, user.password);
		if (!passwordMatched) {
			throw Error(`wrong password`);
		}

		const token = jwt.sign({ data: user }, JWT_SECRET, { expiresIn: '1d' });
		return res.status(200).json({
			success: true,
			message: `welcome back!! ${user.name}`,
			token,
			user
		});
	} catch (err) {
		return errorHandler(err, res);
	}
};

const verifyAccount = async function(req, res) {
	try {
		let { token: authToken, email } = req.body;
		let user = await User.findOne({ email });
		if (!user) throw new Error('user not found');
		let token = await Token.findOneAndDelete({ token: authToken, user: user._id });
		if (!token) {
			throw Error('invalid token');
		}
		await User.findOneAndUpdate({ _id: user._id }, { $set: { status: 1 } });

		return res.json({
			success: true,
			message: 'Email verified successfully!'
		});
	} catch (error) {
		return errorHandler(error, res);
	}
};

const resendToken = async function(req, res) {
	try {
		let { email } = req.body;
		if (!email) throw new Error('Email required!');
		let user = await User.findOne({ email });
		if (!user) throw new Error('Email not registered!');
		if (user.status !== 0) {
			throw new Error('user already verified. please signin to continue');
		}
		await Token.findOneAndDelete({ user: user._id });
		const buffer = crypto.randomBytes(3);
		const token = parseInt(buffer.toString('hex'), 16)
			.toString()
			.substr(0, 6);
		await Token.create({ user: user._id, token: token });
		resendVerificationEmail({ user, token });

		return res.status(200).json({
			success: true,
			message: `Verification token sent to ${email}.`
		});
	} catch (error) {
		return errorHandler(error, res);
	}
};

module.exports = {
	signin,
	signup,
	verifyAccount,
	resendToken
};
