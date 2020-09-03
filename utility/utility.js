const { validationResult } = require("express-validator")
const CustomError = require("./CustomError")

function errorValidation(req,res,next){
    const errors = validationResult(req)
    if (!errors.isEmpty())
        throw new CustomError(errors.array(),422);
    next();
}

module.exports = {errorValidation}