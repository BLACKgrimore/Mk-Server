
# 📘 APIResponse Class Documentation

## Overview

`APIResponse` is a custom JavaScript class that provides a **standardized format for all successful API responses**. Instead of sending raw objects or inconsistently shaped responses, this class ensures a consistent structure that simplifies client-side handling and improves maintainability.

---

## ✅ Why Use APIResponse?

- Ensures all success responses follow the **same format**.
- Provides a clean and extendable way to **add logging or tracing**.
- Easy to use with any web framework like **Express.js**.
- Helps clients reliably interpret API behavior with **statusCode**, **message**, and **data**.
- Now supports optional fields like `timestamp`, `meta`, and `traceId` for better observability.

---

## 🔧 Constructor Syntax

```js
new APIResponse(statusCode, data, message, meta, traceId)
```

### Parameters

| Name          | Type     | Default     | Description |
|---------------|----------|-------------|-------------|
| `statusCode`  | `number` | _Required_  | The HTTP status code (e.g., 200, 201). |
| `data`        | `any`    | _Required_  | The actual payload to return to the client. |
| `message`     | `string` | `"Success"` | A human-readable success message. |
| `meta`        | `object` | `{}`        | Optional metadata (e.g., pagination info). |
| `traceId`     | `string` | `null`      | Optional unique identifier for tracing requests. |

---

## 🧱 Class Properties

| Property      | Type      | Description |
|---------------|-----------|-------------|
| `statusCode`  | `number`  | HTTP status code of the response. |
| `data`        | `any`     | Main payload of the response. |
| `message`     | `string`  | Success message shown to the client. |
| `success`     | `boolean` | Indicates whether the operation was successful (`true` if `statusCode < 400`). |
| `timestamp`   | `string`  | ISO timestamp of when the response was created. |
| `meta`        | `object`  | Optional metadata (e.g., pagination). |
| `traceId`     | `string`  | Optional trace ID for request tracing. |

---

## 🔄 Methods

### `toJSON()`

Returns a plain object that can be safely serialized and returned via `res.json()` in Express or similar frameworks.

#### Example Output:

```json
{
  "success": true,
  "message": "User fetched successfully",
  "statusCode": 200,
  "data": {
    "id": 1,
    "username": "johndoe"
  },
  "timestamp": "2025-04-16T14:03:10.235Z",
  "meta": {
    "page": 1,
    "pageSize": 10,
    "totalPages": 5,
    "totalItems": 50
  },
  "traceId": "6a83b5f2-9c88-4a3c-9db5-beb6ef591236"
}
```

---

### `logResponse()`

Logs the response in **production environments** for monitoring or debugging. By default, it uses `console.info`, but can be extended to integrate with:
- **Winston**
- **Logtail**
- **Datadog**
- **New Relic**

---

## 📦 Usage Example

### Returning a Success Response in Express.js

```js
import { APIResponse } from "./APIResponse.js";
import { v4 as uuidv4 } from "uuid";

app.get("/api/users", (req, res) => {
    const users = [/* ...user list... */];

    const meta = {
        page: 1,
        pageSize: 10,
        totalPages: 5,
        totalItems: 50
    };

    const response = new APIResponse(200, users, "Users fetched successfully", meta, uuidv4());
    res.status(response.statusCode).json(response.toJSON());
});
```

---

## 🛠 When Should You Use APIResponse?

- For **any successful request** (200, 201, 204, etc.).
- When you want to **return data with a success message** in a uniform format.
- To make **client-side error/success handling easier** and more predictable.
- To improve debugging, observability, and pagination support.

---

## 🔐 Optional Extensions

You may extend this class to include:

- `timestamp` (for response time tracking)
- `meta` (for pagination or filtering info)
- `traceId` (for distributed logging/tracing)

---
