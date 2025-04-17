# 🛡️ rateLimiter Utility

## Overview
The `rateLimiter` utility protects your API endpoints from brute-force attacks or abuse by limiting the number of requests a user can make within a time window.

---

## 📦 How to Use

```js
import express from "express";
import { rateLimiter } from "./utils/rateLimiter.js";

const app = express();

// Apply globally
app.use(rateLimiter);

// Or apply to specific route
app.get("/api/protected", rateLimiter, (req, res) => {
    res.json({ message: "You're within the limit!" });
});
