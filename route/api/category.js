const express = require('express');
const router = express.Router();
const Category = require('../../Model/Category');
const Dish = require('../../Model/Dish');
const validateCategory = require('../../validation/category');

// ADD Category
router.post('/', (req, res) => {
	const { errors, isValid } = validateCategory(req.body);
	if (!isValid) {
		return res.status(400).json(errors);
	}
	// Trim the Category name and convert into Title Case
	var a = req.body.name.trim();
	// var name = a.charAt(0).toUpperCase() + a.substr(1).toLowerCase();
	var name = a.charAt(0).toUpperCase() + a.slice(1);

	Category.findOne({ name: name }).then((category) => {
		if (category) {
			errors.name = 'Category already exists';
			return res.status(400).json(errors);
		} else {
			var name = req.body.name.trim();
			const category = new Category({
				name: name,
				image: req.body.image,
			});
			category
				.save()
				.then((data) => {
					Category.find().then((allCategory) => {
						res.json(allCategory);
					});
				})
				.catch((err) => res.json(err));
		}
	});
});

//get Category by id
router.get('/get/:id', (req, res) => {
	const id = req.params.id;
	Category.findById({ _id: id })
		.then((singleCategory) => {
			res.json(singleCategory);
		})
		.catch((err) => console.log(err));
});

// Edit category
router.post('/edit/:id', (req, res) => {
	const id = req.params.id;
	const { errors, isValid } = validateCategory(req.body);
	if (!isValid) {
		return res.status(400).json(errors);
	}
	var a = req.body.name.trim();
	var name = a.charAt(0).toUpperCase() + a.slice(1);
	// str.charAt(0).toUpperCase() + str.slice(1);
	const editedCategory = {
		name: name,
		image: req.body.image,
	};
	Category.findOne({ name: name })
		.then((already) => {
			if (already) {
				errors.name = 'Category already exists';
				return res.status(400).json(errors);
			} else {
				Category.findOneAndUpdate({ _id: id }, { $set: editedCategory }, { new: true })
					.then((edited) => {
						Category.find().then((all) => {
							res.json(all);
						});
					})
					.catch((err) => console.log(err));
			}
		})
		.catch((err) => console.log(err));
});

// Get all category
router.get('/all', (req, res) => {
	Category.find().then((category) => {
		if (category) {
			res.json(category);
		} else {
			res.json('Category Not Found');
		}
	});
});

// delete Category
router.delete('/delete/:id', (req, res) => {
	var id = req.params.id;
	Category.findById({ _id: id })
		.then((category) => {
			if (category) {
				Category.findOneAndDelete({ _id: category._id }).then((del) => {
					Dish.deleteMany({ category: category._id }).then((dish) => {
						Category.find().then((newCategory) => {
							res.json(newCategory);
						});
					});
				});
			}
		})

		.catch((err) => console.log(err));
});

// router.delete('/delete/:catName', (req, res) => {
// 	var name = req.params.catName;
// 	Category.findOne({ name: name })
// 		.then((allCategory) => {
// 			if (allCategory) {
// 				var id = allCategory._id;
// 				Category.findOneAndDelete({ name: name }).then((del) => {
// 					Dish.deleteMany({ category: id }).then((dish) => {
// 						Category.find().then((newCategory) => {
// 							res.json(newCategory);
// 						});
// 					});
// 				});
// 			} else {
// 				res.json('Category not found');
// 			}
// 		})
// 		.catch((err) => console.log(err));
// });
module.exports = router;
