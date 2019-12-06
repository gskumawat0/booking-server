const router = require('express').Router({ mergeParams: true });
const passport = require('passport');
const bookingController = require('../controllers/bookings.js');
const { checkJwtToken } = require('../middlewares/verifyJwt');
// router.use(checkJwtToken, passport.authenticate('userStrategy', { session: false }));

router
	.route('/')
	.get(checkJwtToken, passport.authenticate('userStrategy', { session: false }), bookingController.getBookings)
	.post(checkJwtToken, passport.authenticate('userStrategy', { session: false }), bookingController.addBooking);

router.route('/drivers').get(bookingController.getDrivers);

router
	.route('/:bookingId')
	.get(checkJwtToken, passport.authenticate('userStrategy', { session: false }), bookingController.getBookingDetails)
	.put(checkJwtToken, passport.authenticate('userStrategy', { session: false }), bookingController.updateBooking)
	.delete(checkJwtToken, passport.authenticate('userStrategy', { session: false }), bookingController.deleteBooking);

module.exports = router;
