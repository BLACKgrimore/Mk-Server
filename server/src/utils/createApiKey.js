// utils/createApiKey.js
import crypto from "crypto";

const createApiKey = () => {
    return crypto.randomBytes(32).toString("hex");
};

export { createApiKey };