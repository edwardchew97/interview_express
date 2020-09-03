const { body } = require("express-validator");
const User = require("../../models/UserSchema");
const CustomError = require("../../utility/CustomError");

const registerValidator = [
    body('email').exists().withMessage('Email cannot be empty'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('email').custom(value=>{
        return User.findOne({email:value}).then(user=>{
            if (user) { throw CustomError('Email already exists',422) };
        })
    }).withMessage('Email already exists.'),
    body('password').exists().withMessage('Password cannot be empty'),
    body('password').matches('(?=.*[A-Z])(?=.*[0-9]).{12,}').withMessage('Invalid password format, needs to be more than 12 characters and have at least 1 capital letter and digit'),
    body('name').exists({checkFalsy:true,checkNull:true}).withMessage('Name cannot be empty'),
]

const loginValidator = [
    body('email').exists().withMessage('Email cannot be empty'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('email').custom(email=>{
        return User.findOne({email}).exec().then(user=>{
            if (!user) { throw CustomError('Invalid credentials',422) };
        })
    }).withMessage('Invalid credentials'),
    body('password').exists().withMessage('Password cannot be empty'),
    body('password').matches('(?=.*[A-Z])(?=.*[0-9]).{12,}').withMessage('Invalid credentials'),
]

module.exports = {registerValidator,loginValidator}