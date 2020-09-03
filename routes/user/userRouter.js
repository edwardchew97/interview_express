var express = require('express');
const User = require('../../models/UserSchema');
const authMiddleware = require('../authMiddleware');
const { errorValidation, respondSuccess } = require('../../utility/utility');
var router = express.Router();

/* GET users listing. */
router.get('/', [
	authMiddleware.authenticated,
	errorValidation
],
	async function (req, res, next) {
		let query = req.query.name;
		let condition = query?{name:{$regex:`^${query}.*`}}:null;
		let users = await User.find(condition).exec()
		return respondSuccess(res,'Users retrieved successfully',users);
	}
);

module.exports = router;
