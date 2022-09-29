const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
	name: {
		type: String,
		required: false,
	},
	email: {
		type: String,
		required: false,
	},
	password: {
		type: String,
		required: false,
	},
	phonenumber: {
		type: String,
		required: false,
	},
	Address: {
		type: String,
		required: false,
	},
	Country: {
		type: String,
		required: false,
	},
});

module.exports = User = mongoose.model('users', UserSchema);
