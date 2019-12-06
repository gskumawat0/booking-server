const Driver = require('../models/drivers');
const { errorHandler } = require('../libs/error');

const getDrivers = async function(req, res) {
	try {
		const drivers = await Driver.find({});
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
		const driver = await Driver.create({ ...req.body });
		return res.json({
			success: true,
			driver
		});
	} catch (error) {
		return errorHandler(error, res);
	}
};

const getDriverDetails = async function(req, res) {
	try {
		let { driverId } = req.params;

		const driver = await Driver.findOne({ _id: driverId });
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
		const driver = await Driver.findOneAndUpdate({ _id: driverId }, { $set: { ...req.body } }, { new: true });
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
		const driver = await Driver.findOneAndDelete({ _id: driverId });
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
	getDriverDetails,
	updateDriver,
	deleteDriver
};
