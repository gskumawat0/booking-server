const mongoose = require('mongoose');

const { Schema } = mongoose;

let bookingSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	driver: {
		type: Schema.Types.ObjectId,
		ref: 'Driver'
	},
	tripType: {
		type: String,
		default: 'oneWay'
	},
	stations: {
		origin: String,
		destination: String,
		departDate: Date
	},
	payment: {
		paymentID: String,
		payerID: String,
		paymentToken: String
	},
	amount: Number,
	pickup: {
		time: Date,
		address: String
	},
	date: {
		type: Date,
		default: Date.now
	}
});

// bookingSchema.index({ originLoc: '2dsphere', destinationLoc: '2dsphere' });
module.exports = mongoose.model('Booking', bookingSchema);
