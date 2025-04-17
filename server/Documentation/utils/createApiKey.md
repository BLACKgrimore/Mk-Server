# 🔐 createApiKey Utility

## Overview
Generates a cryptographically secure 256-bit API key.

---

## 📦 How to Use

```js
import { createApiKey } from "./utils/createApiKey.js";

const newKey = createApiKey();
console.log("Your API key:", newKey);
