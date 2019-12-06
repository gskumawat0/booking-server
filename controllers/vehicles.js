const Vehicle = require('../models/vehicles');
const { errorHandler } = require('../libs/error');

const getVehicles = async function(req, res) {
	try {
		const vehicles = await Vehicle.find({});
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
		const vehicle = await Vehicle.create({ ...req.body });
		return res.json({
			success: true,
			vehicle
		});
	} catch (error) {
		return errorHandler(error, res);
	}
};

const getVehicleDetails = async function(req, res) {
	try {
		let { vehicleId } = req.params;

		const vehicle = await Vehicle.findOne({ _id: vehicleId });
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
		const vehicle = await Vehicle.findOneAndUpdate({ _id: vehicleId }, { $set: { ...req.body } }, { new: true });
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
		const vehicle = await Vehicle.findOneAndDelete({ _id: vehicleId });
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
	getVehicleDetails,
	updateVehicle,
	deleteVehicle
};
