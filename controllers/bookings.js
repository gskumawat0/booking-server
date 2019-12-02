const Booking = require('../models/bookings');
const { errorHandler } = require('../libs/error');

const getBookings = async function(req, res) {
	try {
		const bookings = Booking.find({});
		return res.json({
			success: true,
			bookings
		});
	} catch (error) {
		return errorHandler(error, res);
	}
};

const addBooking = async function(req, res) {
	try {
		const booking = Booking.create({ ...req.body });
		return res.json({
			success: true,
			booking
		});
	} catch (error) {
		return errorHandler(error, res);
	}
};

const getBooking = async function(req, res) {
	try {
		let { bookingId } = req.params;

		const booking = Booking.findOne({ _id: bookingId });
		return res.json({
			success: true,
			booking
		});
	} catch (error) {
		return errorHandler(error, res);
	}
};

const updateBooking = async function(req, res) {
	try {
		let { bookingId } = req.params;
		const booking = Booking.findOneAndUpdate({ _id: bookingId }, { $set: { ...req.body } }, { new: true });
		return res.json({
			success: true,
			booking
		});
	} catch (error) {
		return errorHandler(error, res);
	}
};

const deleteBooking = async function(req, res) {
	try {
		let { bookingId } = req.params;
		const booking = Booking.findOneAndDelete({ _id: bookingId });
		return res.json({
			success: true,
			booking
		});
	} catch (error) {
		return errorHandler(error, res);
	}
};

module.exports = {
	getBookings,
	addBooking,
	getBooking,
	updateBooking,
	deleteBooking
};
