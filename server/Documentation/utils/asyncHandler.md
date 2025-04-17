
# ⚙️ asyncHandler Utility Documentation

## Overview

`asyncHandler` is a utility function that wraps asynchronous route handlers in Express.js to ensure that **errors are properly caught and forwarded to your error middleware**. This utility simplifies error handling by eliminating repetitive `try/catch` blocks in each controller.

---

## ✅ Why Use asyncHandler?

- Prevents unhandled promise rejections in async routes.
- Automatically catches any thrown error and forwards it to Express's `next()` function.
- Keeps route controllers clean and focused on business logic.
- Works perfectly with centralized error handlers like `APIError`.

---

## 🔧 Function Signature

```js
asyncHandler(requestHandler)
```

### Parameters

| Name             | Type       | Description |
|------------------|------------|-------------|
| `requestHandler` | `Function` | The async controller or route handler to wrap. |

### Returns

A new function that takes `(req, res, next)` and handles errors internally.

---

## 🧱 Internal Behavior

1. Validates that `requestHandler` is a function.
2. Wraps it in a `Promise.resolve()` to catch any asynchronous errors.
3. Automatically passes any errors to `next(err)` for centralized handling.
4. Optionally logs the error in **production** mode.

---

## 🧪 Example Implementation

```js
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
            if (process.env.NODE_ENV === "production") {
                console.error(`[AsyncHandler] Caught error in async route: ${err.message}`);
            }
            next(err);
        });
    };
};

export { asyncHandler };
```

---

## 📦 Usage Example

```js
import express from "express";
import { asyncHandler } from "./utils/asyncHandler.js";
import { getUserById } from "./services/userService.js";

const app = express();

app.get("/api/users/:id", asyncHandler(async (req, res) => {
    const user = await getUserById(req.params.id); // may throw error
    res.status(200).json({ success: true, data: user });
}));
```

---

## 🛠 Best Practices

| Tip | Description |
|-----|-------------|
| ✅ Always use `asyncHandler` for async route functions | Avoid app crashes or unhandled promise errors. |
| 🔁 Combine with centralized error middleware | Clean and scalable error management. |
| 🧪 Write tests for error-throwing async routes | Make sure async errors are caught properly. |

---

## 🔐 Optional Enhancements

You can extend `asyncHandler` to include:

- Custom logging with tools like **Winston**, **Datadog**, or **New Relic**
- Request-specific metadata (e.g., `traceId`) for advanced observability

---

