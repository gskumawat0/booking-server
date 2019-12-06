const Package = require('../models/packages');
const { errorHandler } = require('../libs/error');

const getPackages = async function(req, res) {
	try {
		const packages = await Package.find({});
		return res.json({
			success: true,
			packages
		});
	} catch (error) {
		return errorHandler(error, res);
	}
};

const addPackage = async function(req, res) {
	try {
		const package = await Package.create({ ...req.body });
		return res.json({
			success: true,
			package
		});
	} catch (error) {
		return errorHandler(error, res);
	}
};

const getPackageDetails = async function(req, res) {
	try {
		let { packageId } = req.params;

		const package = await Package.findOne({ _id: packageId });
		return res.json({
			success: true,
			package
		});
	} catch (error) {
		return errorHandler(error, res);
	}
};

const updatePackage = async function(req, res) {
	try {
		let { packageId } = req.params;
		const package = await Package.findOneAndUpdate({ _id: packageId }, { $set: { ...req.body } }, { new: true });
		return res.json({
			success: true,
			package
		});
	} catch (error) {
		return errorHandler(error, res);
	}
};

const deletePackage = async function(req, res) {
	try {
		let { packageId } = req.params;
		const package = await Package.findOneAndDelete({ _id: packageId });
		return res.json({
			success: true,
			package
		});
	} catch (error) {
		return errorHandler(error, res);
	}
};

module.exports = {
	getPackages,
	addPackage,
	getPackageDetails,
	updatePackage,
	deletePackage
};
