# 📄 Pagination Helper

## Overview
Extracts `page`, `limit`, and `skip` from a request query for Mongoose pagination.

---

## 💻 Usage

```js
import { getPagination } from "./utils/pagination.js";

const { page, limit, skip } = getPagination(req.query);
Model.find().skip(skip).limit(limit);
```

---

## 📌 Why Use It?

- Reduces repeated pagination logic in controllers.