const router = require('express').Router({ mergeParams: true });
const passport = require('passport');
const packageController = require('../controllers/packages.js');
const { checkJwtToken } = require('../middlewares/verifyJwt');

router.use(checkJwtToken, passport.authenticate('userStrategy', { session: false }));

router
	.route('/')
	.get(packageController.getPackages)
	.post(packageController.addPackage);

router
	.route('/:packageId')
	.get(packageController.getPackageDetails)
	.put(packageController.updatePackage)
	.delete(packageController.deletePackage);

module.exports = router;
