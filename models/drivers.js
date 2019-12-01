const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let driverSchema = new Schema({
	name: {
		type: String
	},
	email: {
		type: String,
		unique: true,
		required: true
	},
	pancard: {
		type: String
	},
	drivingLicense: {
		type: String,
		required: true
	},
	language: {
		type: [String],
		default: ['English']
	},
	contact: {
		type: Number,
		required: true
	},
	class: {
		// 'A' - higher skils, 'B', 'C' - lower skills
		type: String,
		default: 'A'
	},
	charges: {
		type: Number,
		default: 10
	},
	address: {
		type: String
	},
	loc: {
		type: {
			type: String,
			default: 'Point'
		},
		coordinates: [Number]
	}
});

module.exports = mongoose.model('Driver', driverSchema);
