const router = require('express').Router({ mergeParams: true });
const passport = require('passport');
const vehicleController = require('../controllers/vehicles.js');
const { checkJwtToken } = require('../middlewares/verifyJwt');

router.use(checkJwtToken, passport.authenticate('userStrategy', { session: false }));

router
	.route('/')
	.get(vehicleController.getVehicles)
	.post(vehicleController.addVehicle);

router
	.route('/:vehicleId')
	.get(vehicleController.getVehicleDetails)
	.put(vehicleController.updateVehicle)
	.delete(vehicleController.deleteVehicle);

module.exports = router;
