const mongoose = require('mongoose');
const moment = require('moment');

const { Schema } = mongoose;
const packageSchema = new Schema({
	title: {
		type: String,
		default: 'Airport Package'
	},
	amount: {
		type: Number,
		default: 1500
	},
	description: {
		// use new line (\n) seperator for multiple lines
		type: String
	},
	terms: {
		// use new line (\n) seperator for multiple lines
		type: String
	},
	origin: {
		type: {
			type: String,
			default: 'Point'
		},
		coordinates: {
			type: [Number],
			default: [77.7000761, 13.1988951] // [lng, lat], bengaluru airport
		}
	},
	expireOn: {
		type: Date,
		default: () =>
			moment()
				.add(2, 'years')
				.valueOf()
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Package', packageSchema);
