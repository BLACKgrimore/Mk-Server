// utils/sanitizeInput.js
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";

const sanitizeInput = (app) => {
    // Sanitize against NoSQL injection
    app.use(mongoSanitize());

    // Sanitize user input from XSS attacks
    app.use(xss());
};

export { sanitizeInput };