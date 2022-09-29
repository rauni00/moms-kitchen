const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const validateExtraDetails = require('../../validation/extradetails');
const validateEditProfile = require('../../validation/editProfile');

// Load User model
const User = require('../../Model/User');
const Cart = require('../../Model/Cart');

// Route for register
let newID = '';
router.post('/register', (req, res) => {
	const { errors, isValid } = validateRegisterInput(req.body);
	//  Check Validation
	if (!isValid) {
		return res.status(400).json(errors);
	}
	User.findOne({ email: req.body.email }).then((user) => {
		if (user) {
			errors.email = 'Email already exists';
			return res.status(400).json(errors);
		} else {
			const newUser = new User({
				name: req.body.name,
				email: req.body.email,
				password: req.body.password,
				phonenumber: "",
				Address: '',
				Country: '',
			});

			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash;
					newUser
						.save()
						.then((user) => {
							newID = user.id;
							res.json(user);
						})
						.catch((err) => console.log(err));
				});
			});
		}
	});
});

// Routes for Extra details add
router.post('/extraDetails', (req, res) => {
	const { errors, isValid } = validateExtraDetails(req.body);
	// Check Validation
	if (!isValid) {
		return res.status(400).json(errors);
	}
	const newFields = {
		phonenumber: req.body.phonenumber,
		Address: req.body.Address,
		Country: req.body.Country,
	};
	User.findOneAndUpdate({ _id: newID }, { $set: newFields }, { new: true })
		.then((user) => {
			if (user) {
				res.json(user);
			}
			// res.json('User Not Found');
		})
		.catch((err) => res.json(err));
});

//complete profile
router.post('/completeProfile/:id', (req, res) => {
	const { errors, isValid } = validateExtraDetails(req.body);
	// Check Validation
	if (!isValid) {
		return res.status(400).json(errors);
	}
	const id = req.params.id;
	const newFields = {
		phonenumber: req.body.phonenumber,
		Address: req.body.Address,
		Country: req.body.Country,
	};
	User.findOneAndUpdate({ _id: id }, { $set: newFields }, { new: true })
		.then((user) => {
			if (user) {
				res.json(user);
			}
			// res.json('User Not Found');
		})
		.catch((err) => res.json(err));
});

// login user and generate token
router.post('/testLogin', (req, res) => {
	const { errors, isValid } = validateLoginInput(req.body);
	// Check Validation
	if (!isValid) {
		return res.status(400).json(errors);
	}
	const email = req.body.email;
	const password = req.body.password;

	// Find user by email
	User.findOne({ email }).then((user) => {
		// Check for user
		if (!user) {
			errors.email = 'User not found';
			return res.status(404).json(errors);
		}

		// Check Password
		bcrypt.compare(password, user.password).then((isMatch) => {
			if (isMatch) {
				// User Matched
				const payload = { id: user.id, name: user.name }; // Create JWT Payload
				// Sign Token
				jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
					res.json({
						success: true,
						token: 'Bearer ' + token,
					});
				});
			} else {
				errors.password = 'Password incorrect';
				return res.status(400).json(errors);
			}
		});
	});
});

router.get('/currentlogin', passport.authenticate('jwt', { session: false }), (req, res) => {
	res.json({
		id: req.user.id,
		name: req.user.name,
		email: req.user.email,
		Address: req.user.Address,
		phonenumber: req.user.phonenumber,
		Country: req.user.Country,
	});
});

// Login User By token
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	const errors = {};
	User.findOne({ _id: req.user.id })
		.then((profile) => {
			if (!profile) {
				errors.noprofile = 'There is no profile for this user';
				return res.status(404).json(errors);
			}
			res.json(profile);
		})
		.catch((err) => res.status(404).json(err));
});

//updated
router.post('/editProfile', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { errors, isValid } = validateEditProfile(req.body);
	// Check Validation
	if (!isValid) {
		return res.status(400).json(errors);
	}
	const { name, email, phonenumber, Country, Address } = req.body;
	const data = {
		name: name,
		email: email,
		phonenumber: phonenumber,
		Country: Country,
		Address: Address,
	};
	User.findOneAndUpdate({ _id: req.user.id }, { $set: data }, { new: true })
		.then((updated) => {
			if (updated) {
				res.json(updated);
			}
		})
		.catch((err) => console.log(err));
});

//

// Deleting User and it's cart item
router.delete('/delete', passport.authenticate('jwt', { session: false }), (req, res) => {
	Cart.findOne({ user: req.user.id }).then((oneItem) => {
		if (oneItem) {
			Cart.findOneAndRemove({ _id: oneItem._id }).then(() => {
				User.findOneAndRemove({ _id: req.user.id }).then(() => {
					res.json({ success: true });
				});
			});
		}
	});
});

module.exports = router;
// // Get all profile of user
// router.get('/all', (req, res) => {
// 	User.find()
// 		.then((user) => {
// 			if (!user) {
// 				errors.noUser = 'There are no user';
// 				return res.status.apply(404).json(errors);
// 			}
// 			res.json(user);
// 		})
// 		.catch((err) => res.status(404).json({ user: 'There are no user' }));
// });
