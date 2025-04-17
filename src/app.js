// app.js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import xss from "xss-clean";
import hpp from "hpp";
import compression from "compression";
import rateLimiter from "./middlewares/rateLimiter.middleware.js";
import applyLogger from "./middlewares/logger.middleware.js";

const app = express();

// Security: Set secure HTTP headers
app.use(helmet());

// Rate limiting to prevent brute-force attacks
app.use(rateLimiter);

// Logger middleware
app.use(applyLogger());

// Prevent HTTP parameter pollution
app.use(hpp());

// Prevent XSS attacks
app.use(xss());

// Enable gzip compression for faster responses
app.use(compression());

// Enable CORS with credentials
const allowedOrigins = process.env.CORS_ORIGIN?.split(",") || [];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
    credentials: true
}));

// Parse JSON and URL-encoded data
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Serve static files
app.use(express.static("public"));

// Cookie parser
app.use(cookieParser());

// Routes would be added here
// app.use("/api/v1", yourRoutes);

// 404 handler
import notFound from "./middlewares/notFound.middleware.js";
app.use(notFound); // Right before errorHandler

import errorHandler from "./middlewares/errorHandler.middleware.js";
app.use(errorHandler); // Should be the last middleware

export default app;