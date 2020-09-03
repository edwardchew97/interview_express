const { validationResult } = require("express-validator")
const CustomError = require("./CustomError")

function errorValidation(req,res,next){
    const errors = validationResult(req).formatWith(({ msg, param})=>{
        return {msg,param}
    })
    if (!errors.isEmpty())
        throw new CustomError(errors.array(),422);
    next();
}

function respondSuccess(res,message,data=null){
    return res.json({message,data});
}
module.exports = {errorValidation,respondSuccess}