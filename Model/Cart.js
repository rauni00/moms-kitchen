const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema For Dish
const CartSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users',
	},
	dish: [
		{
			title: String,
			image: String,
			price: String,
			description: String,
		},
	],
});

module.exports = Cart = mongoose.model('cart', CartSchema);
