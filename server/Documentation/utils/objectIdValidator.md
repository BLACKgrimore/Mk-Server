# 🆔 MongoDB ObjectId Validator

## Overview
Checks if a given string is a valid MongoDB ObjectId.

---

## 💻 Usage

```js
import { isValidObjectId } from "./utils/objectIdValidator.js";

console.log(isValidObjectId("507f1f77bcf86cd799439011")); // true
```

---

## 📌 Why Use It?

- Prevents Mongoose query errors due to invalid IDs.