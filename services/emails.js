const nodemailer = require('nodemailer');
const { SENDER_EMAIL, EMAIL_PWD } = process.env;

// nodemailer transporter setup
let transporter = nodemailer.createTransport({
	host: 'smtp.stackmail.com',
	port: 465,
	secure: true, // true for 465, false for other ports
	auth: {
		user: SENDER_EMAIL,
		pass: EMAIL_PWD
	}
});

const sendEmail = ({ from = SENDER_EMAIL, to, subject, body }) => {
	let mailOption = {
		from,
		to,
		subject,
		text: body
	};
	// send mail with defined transport object
	return transporter.sendMail(mailOption);
};

const sendVerificationEmail = ({ user, token }) => {
	try {
		const to = user.email;
		const subject = `please verify your account`;
		const body = `Hi ${user.name},
        Thanks for signup with Insta Car.
        your verification code is: ${token}.
        enjoy your journey with Insta Car
        - team Insta Car
        `;
		return sendEmail({ to, subject, body });
	} catch (err) {
		return Promise.reject(err);
	}
};

const resendVerificationEmail = ({ user, token }) => {
	try {
		const to = user.email;
		const subject = `account verification token`;
		const body = `Hi ${user.name},
        your verification code for signup with Insta Car is: ${token}.
        if you didn't requested this token. please ignore this email. 
        enjoy your journey with Insta Car
        - team Insta Car
        `;
		return sendEmail({ to, subject, body });
	} catch (err) {
		return Promise.reject(err);
	}
};

module.exports = {
	sendVerificationEmail,
	resendVerificationEmail
};
