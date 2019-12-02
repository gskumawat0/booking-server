const errorHandler = (error, res) => {
	return res.json({
		success: false,
		message: error.message
	});
};

module.exports = {
	errorHandler
};
