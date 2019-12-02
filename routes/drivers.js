const router = require('express').Router({ mergeParams: true });
const passport = require('passport');
const driverController = require('../controllers/drivers.js');
router.use(verifyJwtToken, passport.authenticate('customerStrategy', { session: false }));

router
	.route('/')
	.get(driverController.getDrivers)
	.post(driverController.addDriver);

router
	.route('/:driverId')
	.get(driverController.getDriverDetails)
	.put(driverController.updateDriver)
	.delete(driverController.deleteDriver);

module.exports = router;
