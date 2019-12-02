const express = require('express');

const app = express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const morgan = require('morgan');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

//models
const User = require('./models/users');

//routes
const authRoutes = require('./routes/auth');
const packageRoutes = require('./routes/packages');
const driverRoutes = require('./routes/drivers');
const vehicleRoutes = require('./routes/vehicles');
const bookingRoute = require('./routes/bookings');

let { SESSION_SECRET, DB_URI, NODE_ENV, PORT, JWT_SECRET } = process.env;
if (NODE_ENV === 'development') {
	mongoose.set('debug', true);
}

mongoose
	.connect(DB_URI, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true
	})
	.then(e => console.log('connected to db'))
	.catch(err => console.log(err.message));

app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json({}));
app.use(morgan('dev'));

// session config
app.use(
	session({
		secret: SESSION_SECRET,
		resave: false,
		saveUninitialized: false
	})
);

// passport config
app.use(passport.initialize());
app.use(passport.session());

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = JWT_SECRET;

passport.use(
	'userStrategy',
	new JwtStrategy(opts, function(jwtPayload, done) {
		User.findOne({ email: jwtPayload.data.email }, function(err, user) {
			if (err) {
				return done(err, false);
			}
			if (user) {
				return done(null, user);
			}
			return done(null, false);
		});
	})
);

app.get('/', async function(req, res) {
	try {
		return res.json({
			success: true,
			message: `server is up and running. signin and play around`
		});
	} catch (err) {
		return res.json({
			success: false,
			message: err.message
		});
	}
});

app.use('/packages', packageRoutes);
app.use('/bookings', bookingRoute);
app.use('/auth', authRoutes);
app.use('/vehicles', vehicleRoutes);

app.all('*', (req, res) => {
	res.status(404).json({
		message: `Error 404. requested path ${req.method}, ${req.url} not found.`,
		success: false
	});
});

app.use((err, req, res, next) => {
	if (err) {
		return res.json({
			success: false,
			message: err.message
		});
	}
	next();
});

app.listen(PORT || 3000, () => {
	console.log(`server is running on port: ${PORT},`);
});
