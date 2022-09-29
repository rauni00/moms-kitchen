const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();
const users = require('./route/api/users');
const dish = require('./route/api/dish');
const category = require('./route/api/category');
const cart = require('./route/api/cart');
// const addCategory = require('./route/api/addCategory');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoUri;
// Connect to MongoDB
mongoose
	.connect(db)
	.then(() => console.log('MongoDB Connected'))
	.catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);
app.get('/', (req, res) => res.send('<h1>HELLO WORLD</h1> '));

app.use('/api/users', users);
app.use('/api/dish', dish);
app.use('/api/cart', cart);
app.use('/api/category', category);
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}
const port = process.env.PORT || 6000;

app.listen(port, () => console.log(`Server running on port ${port}`));
