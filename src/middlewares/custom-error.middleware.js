export default class CustomError extends Error {
    constructor(errMessage, statusCode, errorName) {
        super(errMessage);
        this.statusCode = statusCode;
        this.errorName = errorName;
        Error.captureStackTrace(this, this.constructor);
    }
}