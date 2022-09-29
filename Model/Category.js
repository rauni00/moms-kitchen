const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const CategorySchema = new Schema({
	name: {
		type: String,
		require: true,
	},
	image: {
		type: String,
		require: true,
	},
});

module.exports = Category = mongoose.model('category', CategorySchema);
