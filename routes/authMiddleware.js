const {  header } = require("express-validator");
const jwtUtility = require("../utility/jwtUtility");

const authenticated = [
    header('authorization').exists().withMessage('Unauthorized').bail(),
    header('authorization').custom(token=>{
        return jwtUtility.verifyToken(token,function(err,result){
            return err?false:true
        })
    }).withMessage('Unauthorized').bail()
]

module.exports = {authenticated}