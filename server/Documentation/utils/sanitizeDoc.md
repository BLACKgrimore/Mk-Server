# 🧼 Sanitize Mongoose Document

## Overview
Removes `_id`, `__v` and converts `_id` to `id` in Mongoose documents.

---

## 💻 Usage

```js
import { sanitizeDoc } from "./utils/sanitizeDoc.js";

const user = await User.findById(id);
const safeUser = sanitizeDoc(user);
```

---

## 📌 Why Use It?

- Clean, frontend-friendly API responses.