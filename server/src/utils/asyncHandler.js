/**
 * Wraps an asynchronous route handler to catch errors and pass them to Express error middleware.
 * 
 * @param {Function} requestHandler - The asynchronous route controller.
 * @returns {Function} A new function that wraps the original controller with error handling.
 */
const asyncHandler = (requestHandler) => {
    if (typeof requestHandler !== 'function') {
        throw new TypeError("Expected a function as the request handler.");
    }

    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => {
            // Optional: Log the error in production for debugging/observability
            if (process.env.NODE_ENV === "production") {
                console.error(`[AsyncHandler] Caught error in async route: ${err.message}`);
            }

            next(err);
        });
    };
};

export { asyncHandler };

// const asyncHandler = (requestHandler) =>{
//     return (req , res , next ) =>{
//         Promise.resolve(requestHandler(req, res, next)).catch((err)=>next(err))
//     }
// }

// export {asyncHandler} 