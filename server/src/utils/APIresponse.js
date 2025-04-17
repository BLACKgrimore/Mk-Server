/**
 * A standardized class to shape all successful API responses.
 */
class APIResponse {
    /**
     * Constructs a new APIResponse instance.
     * 
     * @param {number} statusCode - HTTP status code (e.g., 200, 201)
     * @param {any} data - The main response payload
     * @param {string} [message="Success"] - A descriptive success message
     * @param {object} [meta={}] - Optional metadata (e.g., pagination)
     * @param {string} [traceId=null] - Optional trace ID for distributed logging
     */
    constructor(statusCode, data, message = "Success", meta = {}, traceId = null) {
        Object.setPrototypeOf(this, new.target.prototype); // maintain prototype chain

        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400; // true for 2xx and 3xx status codes
        this.timestamp = new Date().toISOString(); // auto-generated timestamp
        this.meta = Object.keys(meta).length > 0 ? meta : undefined;
        this.traceId = traceId || undefined;

        if (process.env.NODE_ENV === "production") {
            this.logResponse();
        }
    }

    /**
     * Returns a plain object that can be safely serialized to JSON
     * @returns {object}
     */
    toJSON() {
        const response = {
            success: this.success,
            message: this.message,
            statusCode: this.statusCode,
            data: this.data,
            timestamp: this.timestamp,
        };

        if (this.meta) response.meta = this.meta;
        if (this.traceId) response.traceId = this.traceId;

        return response;
    }

    /**
     * Optional response logger (can be replaced with a real logger)
     */
    logResponse() {
        console.info(`[APIResponse] ${this.statusCode} - ${this.message}`);
    }
}

export { APIResponse };


// class APIresponse{
//     constructor(statusCode, data, message = "Success"){
//         this.statusCode = statusCode
//         this.data = data
//         this.message = message 
//         this.success = statusCode < 400
//     }
// } 

// export { APIresponse };