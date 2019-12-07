# Taxi Booking

api for taxi booking app. you can add drivers, taxi and packages. you can access this api at https://taxi-booking-gs.herokuapp.com

# Prerequistics

-   `nodejs 10.x`
-   `npm 6.x`

# Installing and Running

1. clone this repo `git clone https://github.com/gskumawat0/booking-server`
1. install npm packages `npm install`
1. create a `.nodemon.json` file as given below:

```
{
	"env": {
		"PORT": "",
		"DB_URI": ",
		"SESSION_SECRET": "",
		"JWT_SECRET": "",
		"NODE_ENV": "",
		"SENDER_EMAIL": "",
		"EMAIL_PWD": ""
	}
}
```

1. now run `npm run dev` to start your app

# Schemas

1. User

```
    name: String,
	address: String
	contact: Number
	password: String
	email: String
	dob: Date
```

1. Driver

```
    name: String
	email: String
	pancard: String
	drivingLicense: String
	language: String
	contact: Number
	class: String
	charges: Number
	address: String
	loc: {
		type: String //enum Point
		coordinates: [Number]
	}
```

1. Package

```
    title: String
	amount: Number
	description: String
	terms: String
	origin: {
		type: String //enum Point
		coordinates: [Number]
	expireOn: Date
```

1. Vehicles

```
    model: String
	ratePerKm: Number
	brand: String
	color: String
	regNumber: String
	seats: Number
	fuel: String
```

## Api endpoints

1. add driver - POST `/drivers/`
1. add vehicle - POST `/vehicles/`
1. add package - POST `/packages/`
1. signup - POST `/auth/signup`
1. signin - POST `/auth/signin`

# Contact

-   [Gouri Shankar Kumawat](https://gskumawat.herokuapp.com)
