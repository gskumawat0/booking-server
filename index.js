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
			message: `wow!! server is working.`
		});
	} catch (err) {
		return res.json({
			success: false,
			message: err.message
		});
	}
});

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
	console.log(`server is running on port: ${process.env.PORT},`);
});
