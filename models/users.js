const mongoose = require('mongoose');
const { Schema } = mongoose;

const User = new Schema({
	name: String,
	address: {
		type: String
	},
	contact: {
		type: Number,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	email: {
		type: String,
		unique: true,
		required: true
	},
	dob: {
		type: Date
	},
	createdOn: {
		type: Date,
		default: Date.now
	},
	status: {
		// 0 - pending, 1- active, 2-suspended
		type: Number,
		default: 0
	}
});

module.exports = mongoose.model('User', User);
