const router = require('express').Router({ mergeParams: true });
const passport = require('passport');
const driverController = require('../controllers/drivers.js');
const { checkJwtToken } = require('../middlewares/verifyJwt');

router.use(checkJwtToken, passport.authenticate('userStrategy', { session: false }));

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
