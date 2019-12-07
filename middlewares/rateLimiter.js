// ref: https://codeforgeek.com/building-api-rate-limiter-using-nodejs-redis/

const redis = require('redis');
const moment = require('moment');
const { errorHandler } = require('../libs/error');

const redisClient = redis.createClient();

module.exports = async (req, res, next) => {
	redisClient.exists(req.connection.remoteAddress, (err, isExist) => {
		if (err) {
			return errorHandler(new Error('something went wrong. please try after some time'), res);
		}
		if (isExist) {
			// connection exists
			// check time interval
			redisClient.get(req.connection.remoteAddress, (err, resp) => {
				if (err) {
					return errorHandler(new Error('something went wrong. please try after some time'), res);
				}
				let data = JSON.parse(resp);
				let currentTime = Date.now();
				let difference = (currentTime - data.startTime) / 60000;

				if (difference >= 1) {
					let body = {
						count: 1,
						startTime: Date.now()
					};
					redisClient.set(req.connection.remoteAddress, JSON.stringify(body));
					// allow the request
					next();
				}
				if (difference < 1) {
					if (data.count > 100) {
						return errorHandler(new Error('max limit reached'), res);
					}
					// update the count and allow the request
					data.count++;
					redisClient.set(req.connection.remoteAddress, JSON.stringify(data));
					// allow request
					next();
				}
			});
		} else {
			// add new user
			let body = {
				count: 1,
				startTime: Date.now()
			};
			redisClient.set(req.connection.remoteAddress, JSON.stringify(body));
			// allow request
			next();
		}
	});
};
