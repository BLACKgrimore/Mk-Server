# 🧼 sanitizeInput Utility

## Overview
The `sanitizeInput` utility secures your app from **NoSQL injection** and **Cross-site Scripting (XSS)** by cleaning incoming data.

---

## 📦 How to Use

```js
import express from "express";
import { sanitizeInput } from "./utils/sanitizeInput.js";

const app = express();

sanitizeInput(app); // Plug it in before routes
