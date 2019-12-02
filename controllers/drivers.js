const Driver = require('../models/drivers');
const { errorHandler } = require('../libs/error');

const getDrivers = async function(req, res) {
	try {
		const drivers = Driver.find({});
		return res.json({
			success: true,
			drivers
		});
	} catch (error) {
		return errorHandler(error, res);
	}
};

const addDriver = async function(req, res) {
	try {
		const driver = Driver.create({ ...req.body });
		return res.json({
			success: true,
			driver
		});
	} catch (error) {
		return errorHandler(error, res);
	}
};

const getDriver = async function(req, res) {
	try {
		let { driverId } = req.params;

		const driver = Driver.findOne({ _id: driverId });
		return res.json({
			success: true,
			driver
		});
	} catch (error) {
		return errorHandler(error, res);
	}
};

const updateDriver = async function(req, res) {
	try {
		let { driverId } = req.params;
		const driver = Driver.findOneAndUpdate({ _id: driverId }, { $set: { ...req.body } }, { new: true });
		return res.json({
			success: true,
			driver
		});
	} catch (error) {
		return errorHandler(error, res);
	}
};

const deleteDriver = async function(req, res) {
	try {
		let { driverId } = req.params;
		const driver = Driver.findOneAndDelete({ _id: driverId });
		return res.json({
			success: true,
			driver
		});
	} catch (error) {
		return errorHandler(error, res);
	}
};

module.exports = {
	getDrivers,
	addDriver,
	getDriver,
	updateDriver,
	deleteDriver
};
