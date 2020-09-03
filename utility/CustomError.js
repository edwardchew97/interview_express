

module.exports = function CustomError(message, httpStatus=422) {
    if (typeof(message) !== 'object')
        message = [message];

    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message;
    this.status = httpStatus;
};