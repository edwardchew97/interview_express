

module.exports = function CustomError(message, httpStatus) {
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message;
    this.status = httpStatus;
};