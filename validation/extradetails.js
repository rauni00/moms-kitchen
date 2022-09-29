const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExtraDetails(data) {
	let errors = {};
	data.phonenumber = !isEmpty(data.phonenumber) ? data.phonenumber : '';
	data.Address = !isEmpty(data.Address) ? data.Address : '';
	data.Country = !isEmpty(data.Country) ? data.Country : '';

	if (!Validator.isLength(data.phonenumber, { min: 10, max: 10 })) {
		errors.phonenumber = 'Phone Number must be 10 Digit';
	}

	if (Validator.isEmpty(data.Address)) {
		errors.Address = 'Address field is required';
	}

	if (!Validator.isLength(data.Address, { min: 10, max: 100 })) {
		errors.Address = 'Address must be at least 6 characters';
	}

	if (Validator.isEmpty(data.Country)) {
		errors.Country = 'Country field is required';
	}
	return {
		errors,
		isValid: isEmpty(errors),
	};
};
