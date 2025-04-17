/**
 * Custom API Error for standardized error handling across the app.
 */
class APIError extends Error {
    /**
     * Constructs a new APIError instance.
     * 
     * @param {number} statusCode - HTTP status code.
     * @param {string} [message="Something went wrong"] - Error message.
     * @param {Array} [errors=[]] - Additional error details (e.g. validation errors).
     * @param {string} [stack=""] - Optional stack trace override.
     */
    constructor(statusCode, message = "Something went wrong", errors = [], stack = "") {
        super(message);

        // Ensure prototype chain is correct (important when extending built-ins)
        Object.setPrototypeOf(this, new.target.prototype);

        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.message = message;
        this.errors = errors;
        this.data = null;
        this.success = false;

        // Capture stack trace if not provided
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }

        // Optional logging (only in production)
        if (process.env.NODE_ENV === "production") {
            this.logError();
        }
    }

    /**
     * Optional: Logs error to console or external logger.
     * Extend this method to integrate with logging services.
     */
    logError() {
        console.error(`[${this.name}] ${this.statusCode}: ${this.message}`);
        if (this.errors && this.errors.length > 0) {
            console.error("Details:", JSON.stringify(this.errors, null, 2));
        }
    }

    /**
     * Serialize the error for API responses.
     * @returns {Object} JSON representation of the error.
     */
    toJSON() {
        return {
            success: this.success,
            message: this.message,
            statusCode: this.statusCode,
            errors: this.errors,
            data: this.data,
        };
    }
}

export { APIError };


// class APIError extends Error {
//     constructor(
//         statusCode,  
//         message = "Something went wrong",
//         errors = [],
//         stack = ""
//     ){
//         super(message)
//         this.statusCode = statusCode
//         this.data = null
//         this.message = message
//         this.success = false
//         this.errors = errors

//         if (stack){
//             this.stack = stack
//         }else{
//             Error.captureStackTrace(this, this.constructor)
//         }
//     }
// }

// export {APIError}