const express = require('express');
const router = express.Router();

const authValidator = require('./authValidator.js');
const { errorValidation, respondSuccess } = require('../../utility/utility.js');
const User = require('../../models/UserSchema.js');
const CustomError = require('../../utility/CustomError.js');


router.post('/register', [
    authValidator.registerValidator, 
    errorValidation
],
    async function(req,res){
        const {email,name,password} = req.body
        let user = await User.create({
            email,name,password
        });
        respondSuccess(res,'User registered successfully',user.toObject());
    }
);

router.post('/login',[
    authValidator.loginValidator,
    errorValidation
], 
    async function(req,res,next){
        // Step 1: Preparing variables
        const {email,password} = req.body
        const user = await User.findOne({email}).exec();

        // Step 2: Start authenticating
        const result = user.attempt(password)
        if (!result) 
            return next(new CustomError('Invalid credentials',422));

        respondSuccess(res,'Logged in succesfully',result);
    }
);

module.exports = router
