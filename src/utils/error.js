class CustomError extends Error {
    constructor(statusCode, message, errors) {
        super(message);

        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CustomError)
        }

        this.status = statusCode || 500;
        this.errors = errors ? errors.errors : message;
    }
}

module.exports = CustomError;
