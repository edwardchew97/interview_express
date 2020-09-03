const express = require('express');
const router = express.Router();

const jwt = require('../../utility/jwtUtility.js');
const { body, validationResult, header } = require('express-validator/check');
const bcrypt = require("bcryptjs");
const CustomError = require('../../utility/CustomError.js');
const authValidator = require('./authValidator.js');
const { errorValidation } = require('../../utility/utility.js');


router.post('/login',
    authValidator.loginValidator, errorValidation,
    function(req,res){
        console.log(req.email)
        res.send('haha');
    }
);

module.exports = router
