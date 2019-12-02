const Package = require('../models/packages');
const { errorHandler } = require('../libs/error');

const getPackages = async function(req, res) {
	try {
		const packages = Package.find({});
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
		const package = Package.create({ ...req.body });
		return res.json({
			success: true,
			package
		});
	} catch (error) {
		return errorHandler(error, res);
	}
};

const getPackage = async function(req, res) {
	try {
		let { packageId } = req.params;

		const package = Package.findOne({ _id: packageId });
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
		const package = Package.findOneAndUpdate({ _id: packageId }, { $set: { ...req.body } }, { new: true });
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
		const package = Package.findOneAndDelete({ _id: packageId });
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
	getPackage,
	updatePackage,
	deletePackage
};
