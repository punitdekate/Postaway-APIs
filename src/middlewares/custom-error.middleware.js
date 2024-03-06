export default class CustomError extends Error {
    constructor(errMessage, statusCode) {
        super(errMessage);
        this.statusCode = statusCode;
    }
}