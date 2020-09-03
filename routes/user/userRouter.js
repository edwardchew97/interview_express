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
		let users = await User.find().exec()
		return respondSuccess(res,'Users retrieved successfully',users);
	}
);

module.exports = router;
