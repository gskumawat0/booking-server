const router = require('express').Router({ mergeParams: true });
const passport = require('passport');
const vehicleController = require('../controllers/vehicles.js');
router.use(verifyJwtToken, passport.authenticate('customerStrategy', { session: false }));

router
	.route('/')
	.get(vehicleController.getDrivers)
	.post(vehicleController.addDriver);

router
	.route('/:vehicleId')
	.get(vehicleController.getDriverDetails)
	.put(vehicleController.updateDriver)
	.delete(vehicleController.deleteDriver);

module.exports = router;
