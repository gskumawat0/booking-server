const mongoose = require('mongoose');
const { Schema } = mongoose;

let bookingSchema = new Schema({
	user: {
		type: String
	},
	driver: {
		type: String
	},
	destinations: {
		type: []
	},
	vehicle: {
		type: String
	},
	tripType: {
		type: String,
		default: 'oneWay'
	},
	originAddress: {
		type: String
	},
	destinationAddress: {
		type: String
	},
	originLoc: {
		type: {
			type: String,
			default: 'Point'
		},
		coordinates: [Number]
	},
	destinationLoc: {
		type: {
			type: String,
			default: 'Point'
		},
		coordinates: [[[Number]]]
	},
	departureDate: {
		type: Date,
		default: time.now()
	},
	amount: {
		type: Number
	},
	paymentStatus: {
		type: String,
		default: 'pending'
	},
	PaymentId: String,
	date: {
		type: Date,
		default: Date.now
	}
});

bookingSchema.index({ originLoc: '2dsphere', destinationLoc: '2dsphere' });
module.exports = mongoose.model('Booking', bookingSchema);
