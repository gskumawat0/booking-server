const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let vechicleSchema = new Schema({
	model: {
		type: String
	},
	ratePerKm: {
		type: Number,
		default: 20
	},
	brand: {
		type: String
	},
	color: {
		type: String
	},
	regNumber: {
		type: String,
		index: true,
		unique: true
	},
	seats: {
		type: Number,
		default: '4'
	},

	fuel: {
		type: String,
		default: 'diseal'
	}
});

module.exports = mongoose.model('Vehicle', vechicleSchema);
