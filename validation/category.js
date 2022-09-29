const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCategory(data) {
	let errors = {};
	data.name = !isEmpty(data.name) ? data.name : '';
	data.image = !isEmpty(data.image) ? data.image : '';

	if (Validator.isEmpty(data.name)) {
		errors.name = 'Category name is required';
	}

	if (Validator.isEmpty(data.image)) {
		errors.image = 'Image URL is required';
	}
	// var character = '5';
	// if (character == character.toUpperCase()) {
	// 	alert('upper case true');
	// }
	// if (character == character.toLowerCase()) {
	// 	alert('lower case true');
	// }
	return {
		errors,
		isValid: isEmpty(errors),
	};
};
