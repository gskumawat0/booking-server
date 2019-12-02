const router = require('express').Router({ mergeParams: true });
const authController = require('../controllers/auth');

router.route('/signup').post(authController.signup);
router.route('/signin').post(authController.signin);
router.route('/resend').post(authController.resendToken);
router.route('/verify').post(authController.verifyAccount);
module.exports = router;
