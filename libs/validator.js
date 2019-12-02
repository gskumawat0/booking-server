const isEmpty = obj => {
	return Object.values(obj).every(val => {
		if (typeof val === 'object') {
			return isEmpty(val);
		}
		return Boolean(val);
	});
};

const isEmail = email => {
	const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
};

const isContact = contact => {
	const re = /^[2-9]{1}\d{9}$/;
	return re.test(contact);
};

module.exports = {
	isEmail,
	isEmpty,
	isContact
};
