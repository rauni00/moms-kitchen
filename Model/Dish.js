const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema For Dish
const DishSchema = new Schema({
	category: {
		type: Schema.Types.ObjectId,
		ref: 'category',
	},
	price: {
		type: String,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
});

module.exports = Dish = mongoose.model('dishes', DishSchema);
