const jwt = require('jsonwebtoken');

module.exports.checkJwtToken = function(req, res, next) {
	let token = req.headers.authorization.split(/\s/)[1];
	if (token) {
		jwt.verify(token, process.env.JWT_SECRET, function(err, decodedData) {
			if (err) {
				// next(err.message)
				next('please signin to continue');
			} else {
				req.decodedData = decodedData.data;
				next();
			}
		});
	} else {
		next('first things first. please signin.');
	}
};
