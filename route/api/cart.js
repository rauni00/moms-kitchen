const express = require('express');
const router = express.Router();
const Cart = require('../../Model/Cart');
const passport = require('passport');

//  Add to Cart
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { title, price, description, image } = req.body;
	Cart.findOne({ user: req.user.id }).then((present) => {
		if (present) {
			const cart = {
				title: title,
				image: image,
				description: description,
				price: price,
			};
			present.dish.unshift(cart);
			present
				.save()
				.then((c) => res.json(c))
				.catch((err) => {
					console.log(err);
					res.status(500).send('Something went wrong');
				});
		} else {
			const cart = new Cart({
				user: req.user.id,
				dish: [{ title, price, description, image }],
			});
			cart.save()
				.then((oneUserCart) => {
					res.json(oneUserCart);
				})
				.catch((err) => {
					console.log(err);
					res.status(500).send('Something went wrong');
				});
		}
	});
});

// Get Cart Dish
router.get('/cartDish', passport.authenticate('jwt', { session: false }), (req, res) => {
	Cart.findOne({ user: req.user.id })
		.then((userDish) => {
			res.json(userDish);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send('Something went wrong');
		});
});

// delete Cart item
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	const id = req.params.id;
	Cart.updateOne({ user: req.user.id }, { $pull: { dish: { _id: id } } }, { safe: true })
		.then((updated) => {
			Cart.findOne({ user: req.user.id }).then((updatedCart) => {
				res.json(updatedCart);
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send('Something went wrong');
		});
});
module.exports = router;
