# 🚨 Error Logger

## Overview
Logs errors in a consistent format across the backend.

---

## 💻 Usage

```js
import { logError } from "./utils/logger.js";

try {
  // your logic
} catch (error) {
  logError(error, "Something failed");
}
```

---

## 📌 Why Use It?

- Centralizes logging for better observability.