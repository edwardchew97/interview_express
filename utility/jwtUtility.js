const jwt = require("jsonwebtoken")
const key = "52BEECBE974F61F2F3180723699A9E15BC05A36B488BAF99ABFC6BC8C3B775EB";

function generateToken(user) {
    var token = jwt.sign(user, key, {
        expiresIn: "30d"
    })
    return token
}

function verifyToken(token, callBack) {
    return jwt.verify(token, key, callBack)
}

function getUserId(token) {
    return jwt.verify(token, key).id
}

function errorHandling(errName) {
    var result = {};
    result.status = "Error"
    switch (errName) {
        case "TokenExpiredError":
            result.message = "Token has expired"
            result.details = "Please login again"
            break;
        case "JsonWebTokenError":
            result.message = "Invalid token."
            result.details = "Please login again"
            break;
    }
    return result;
}

module.exports = {
    generateToken,
    errorHandling,
    verifyToken,
}