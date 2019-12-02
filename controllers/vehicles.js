const Vehicle = require('../models/vehicles');
const { errorHandler } = require('../libs/error');

const getVehicles = async function(req, res) {
	try {
		const vehicles = Vehicle.find({});
		return res.json({
			success: true,
			vehicles
		});
	} catch (error) {
		return errorHandler(error, res);
	}
};

const addVehicle = async function(req, res) {
	try {
		const vehicle = Vehicle.create({ ...req.body });
		return res.json({
			success: true,
			vehicle
		});
	} catch (error) {
		return errorHandler(error, res);
	}
};

const getVehicle = async function(req, res) {
	try {
		let { vehicleId } = req.params;

		const vehicle = Vehicle.findOne({ _id: vehicleId });
		return res.json({
			success: true,
			vehicle
		});
	} catch (error) {
		return errorHandler(error, res);
	}
};

const updateVehicle = async function(req, res) {
	try {
		let { vehicleId } = req.params;
		const vehicle = Vehicle.findOneAndUpdate({ _id: vehicleId }, { $set: { ...req.body } }, { new: true });
		return res.json({
			success: true,
			vehicle
		});
	} catch (error) {
		return errorHandler(error, res);
	}
};

const deleteVehicle = async function(req, res) {
	try {
		let { vehicleId } = req.params;
		const vehicle = Vehicle.findOneAndDelete({ _id: vehicleId });
		return res.json({
			success: true,
			vehicle
		});
	} catch (error) {
		return errorHandler(error, res);
	}
};

module.exports = {
	getVehicles,
	addVehicle,
	getVehicle,
	updateVehicle,
	deleteVehicle
};
