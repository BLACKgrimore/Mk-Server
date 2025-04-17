
# 📘 APIError Class Documentation

## Overview

`APIError` is a custom JavaScript class that extends the native `Error` object. It's designed for **standardized error handling** in web applications and APIs. Rather than throwing plain JavaScript errors, we use `APIError` to consistently structure and format errors in a way that’s helpful for both developers and clients consuming the API.

---

## ✅ Why Use APIError?

- Ensures **consistent error responses** across the application.
- Makes it easier to **log, debug, and trace** issues in production.
- Allows **custom properties** like `statusCode`, `errors`, and `success`.
- Supports integration with **logging services** or external tools (e.g. Sentry, Winston).
- Easily serializable with `.toJSON()` method for API responses.

---

## 🔧 Constructor Syntax

```js
new APIError(statusCode, message, errors, stack)
```

### Parameters

| Name         | Type     | Default                 | Description |
|--------------|----------|--------------------------|-------------|
| `statusCode` | `number` | _Required_              | The HTTP status code to return (e.g., 400, 404, 500). |
| `message`    | `string` | `"Something went wrong"`| A human-readable error message. |
| `errors`     | `Array`  | `[]`                    | An optional array of additional error details (e.g., validation issues). |
| `stack`      | `string` | `""`                    | Optional stack trace override. Useful when rethrowing errors. |

---

## 🧱 Class Properties

| Property     | Type     | Description |
|--------------|----------|-------------|
| `name`       | `string` | Set to the class name: `"APIError"`. |
| `statusCode` | `number` | HTTP status code of the error. |
| `message`    | `string` | Main error message. |
| `errors`     | `Array`  | Additional structured error details. |
| `data`       | `null`   | Placeholder for consistency (always null in this error). |
| `success`    | `boolean`| Always `false` to indicate failure. |
| `stack`      | `string` | Stack trace of the error. Useful for debugging. |

---

## 🔄 Methods

### `toJSON()`

Serializes the error into a clean object that can be returned in an API response.

#### Example:

```json
{
  "success": false,
  "message": "User not found",
  "statusCode": 404,
  "errors": [],
  "data": null
}
```

---

### `logError()`

Logs error details to the console. This method is called **only in production environments** by default.

```js
logError() {
  console.error(`[APIError] 500: Internal Server Error`);
}
```

You can override this method or enhance it to log to external services like:
- **Winston**
- **Sentry**
- **Datadog**
- **New Relic**

---

## 📦 Usage Example

### Throwing an APIError

```js
import { APIError } from "./APIError.js";

function getUser(id) {
    const user = null; // Simulating "not found"
    if (!user) {
        throw new APIError(404, "User not found");
    }
}
```

### Handling APIError in Express.js Middleware

```js
app.use((err, req, res, next) => {
    if (err instanceof APIError) {
        res.status(err.statusCode).json(err.toJSON());
    } else {
        const genericError = new APIError(500, "Internal Server Error");
        res.status(500).json(genericError.toJSON());
    }
});
```

---

## 🛠 When Should You Use APIError?

- For **custom error throwing** in controllers, services, or database logic.
- To return **client-friendly error messages** with appropriate HTTP codes.
- When you want a **single format** for both developers and frontend users to understand API errors.
- To handle **complex validation errors** cleanly.

---

## 🔐 Optional Extensions

You can extend the class to include:

- `errorCode` (for internal tracking)
- `timestamp` (for logging)
- `requestId` or `traceId` (for distributed tracing)

---
