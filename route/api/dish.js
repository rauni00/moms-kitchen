const express = require('express');
const Category = require('../../Model/Category');
// const Dish = require('../../Model/Dish');
const Dish = require('../../Model/Dish');
const router = express.Router();
const validateDish = require('../../validation/dish');

// Add dish
router.post('/add/:cateName', (req, res) => {
	const { errors, isValid } = validateDish(req.body);
	if (!isValid) {
		return res.status(400).json(errors);
	}
	var name = req.params.cateName;
	// Filter the Category Name and get the category id and  assign to the dish category as id
	Category.findOne({ name: name }).then((oneCategory) => {
		if (oneCategory) {
			const dish = new Dish({
				category: oneCategory._id,
				price: req.body.price,
				title: req.body.title,
				description: req.body.description,
				image: req.body.image,
			});
			dish.save()
				.then((added) => {
					Dish.find({ category: oneCategory._id }).then((a) => {
						res.json(a);
					});
				})
				.catch((err) => res.json(errors));
		} else {
			res.json('Category not found Add category first');
		}
	});
});

// Get specific dish
router.get('/get/:cateName', (req, res) => {
	var name = req.params.cateName;
	Category.findOne({ name: name })
		.then((oneCategory) => {
			var id = oneCategory._id;
			Dish.find({ category: id }).then((dish) => {
				if (dish.length === 0) {
					res.json('Dish not found');
				} else {
					res.json({ Dish: dish });
				}
			});
		})

		.catch((err) => console.log(err));
});

// Edit Dish
router.post('/edit/:cateName/:id', (req, res) => {
	const { errors, isValid } = validateDish(req.body);
	if (!isValid) {
		return res.status(400).json(errors);
	}
	var name = req.params.cateName;
	var id = req.params.id;
	const updateDish = {
		price: req.body.price,
		title: req.body.title,
		description: req.body.description,
		image: req.body.image,
	};
	Dish.findOneAndUpdate({ _id: id }, { $set: updateDish }, { new: true })
		.then((updatedDish) => {
			Category.findOne({ name: name }).then((oneCategory) => {
				Dish.find({ category: oneCategory._id }).then((a) => {
					res.json(a);
				});
			});
		})
		.catch((err) => console.log(err));
});

// delete Dish
router.delete('/delete/:cateName/:id', (req, res) => {
	var name = req.params.cateName;
	var id = req.params.id;
	Dish.findOneAndDelete({ _id: id })
		.then((del) => {
			Category.findOne({ name: name }).then((oneCategory) => {
				Dish.find({ category: oneCategory._id }).then((a) => {
					res.json(a);
				});
			});
		})
		.catch((err) => console.log(err));
});

// get dish by id
router.get('/get/dish/:id', (req, res) => {
	var id = req.params.id;
	Dish.findById({ _id: id })
		.then((dish) => {
			res.json(dish);
		})
		.catch((err) => console.log(err));
});

// Get all dish
router.get('/all', (req, res) => {
	Dish.find().then((allDish) => {
		if (allDish) {
			res.json(allDish);
		} else {
			res.json('Dish not Found');
		}
	});
});

module.exports = router;
