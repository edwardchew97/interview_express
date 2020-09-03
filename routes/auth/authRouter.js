const express = require('express');
const router = express.Router();

const jwt = require('../../utility/jwtUtility.js');
const authValidator = require('./authValidator.js');
const { errorValidation, respondSuccess } = require('../../utility/utility.js');
const User = require('../../models/UserSchema.js');
const bcrypt = require("bcryptjs");
const CustomError = require('../../utility/CustomError.js');


router.post('/register',
    authValidator.registerValidator, errorValidation,
    async function(req,res){
        const {email,name,password} = req.body
        let user = await User.create({
            email,name,password
        });
        respondSuccess(res,'User registered successfully',user);
    }
);

router.post('/login',
    authValidator.loginValidator, errorValidation,
    async function(req,res,next){
        const {email,password} = req.body
        // Email always exists, we checked in validator
        const user = await User.findOne({email}).exec();
        if (!user.attempt(password)) 
            return next(new CustomError('Invalid credentials',422));

        respondSuccess(res,'Logged in succesfully',user);
    }
);

module.exports = router
