const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateDish(data) {
	let errors = {};
	data.price = !isEmpty(data.price) ? data.price : '';
	data.title = !isEmpty(data.title) ? data.title : '';
	data.image = !isEmpty(data.image) ? data.image : '';
	data.description = !isEmpty(data.description) ? data.description : '';

	if (Validator.isEmpty(data.price)) {
		errors.price = 'Price field is require';
	}
	if (Validator.isEmpty(data.title)) {
		errors.title = 'title field is required';
	}
	if (Validator.isEmpty(data.title)) {
		errors.title = 'title field is required';
	}
	if (Validator.isEmpty(data.description)) {
		errors.description = 'Description field is required';
	}
	if (Validator.isEmpty(data.image)) {
		errors.image = 'Image field is required';
	}
	return {
		errors,
		isValid: isEmpty(errors),
	};
};
