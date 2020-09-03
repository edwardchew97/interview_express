const { validationResult } = require("express-validator")
const CustomError = require("./CustomError")

function errorValidation(req,res,next){

    // Step 1: Format message
    var status = 422;
    const errors = validationResult(req).formatWith(({ msg, param})=>{
        if (msg === 'Unauthorized') status =401
        return msg
    })

    // Step 2: Throw Error
    if (!errors.isEmpty()){
        throw new CustomError(errors.array(),status);
    }
    next();
}

function respondSuccess(res,message,data=null){
    return res.json({message,data});
}
module.exports = {errorValidation,respondSuccess}