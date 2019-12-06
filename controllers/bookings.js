const Booking = require('../models/bookings');
const { errorHandler } = require('../libs/error');
const Driver = require('../models/drivers');

const getBookings = async function(req, res) {
	try {
		const bookings = await Booking.find({ user: req.user._id }, '-payment')
			.populate('driver')
			.exec();
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
		let { _id: user } = req.user;
		const booking = await Booking.create({ ...req.body, user });
		return res.json({
			success: true,
			message: `Successfully book a taxi on ${new Date(booking.stations.departDate).toDateString()}`
		});
	} catch (error) {
		return errorHandler(error, res);
	}
};

const getBookingDetails = async function(req, res) {
	try {
		let { bookingId } = req.params;

		const booking = await Booking.findOne({ _id: bookingId });
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
		const booking = await Booking.findOneAndUpdate({ _id: bookingId }, { $set: { ...req.body } }, { new: true });
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
		const booking = await Booking.findOneAndDelete({ _id: bookingId });
		return res.json({
			success: true,
			booking
		});
	} catch (error) {
		return errorHandler(error, res);
	}
};

const getDrivers = async function(req, res) {
	try {
		let { lng, cls } = req.query;
		let classes = cls.split(',');
		let languages = lng.split(',');
		const drivers = await Driver.find({ class: { $in: classes }, language: { $in: languages } }).limit(3);
		return res.json({
			success: true,
			drivers
		});
	} catch (error) {
		return errorHandler(error, res);
	}
};

module.exports = {
	getBookings,
	addBooking,
	getBookingDetails,
	updateBooking,
	deleteBooking,
	getDrivers
};
