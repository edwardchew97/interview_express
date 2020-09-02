var express = require('express');
const User = require('../models/UserSchema');
var router = express.Router();

/* GET users listing. */
router.get('/', async function (req, res, next) {
	let user = await User.create({
		email: 'edwardchew9723@gmail.com',
		password : 'testtest000'
	})
	console.log(user)
	
	res.send('respond with a resource');
});

module.exports = router;
