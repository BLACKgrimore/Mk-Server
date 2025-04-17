# 🔍 parseQueryFilters Utility

## Overview
Safely parses incoming request query parameters and returns only the fields that are **allowed for filtering**.

---

## 📦 How to Use

```js
import { parseQueryFilters } from "./utils/parseQueryFilters.js";

const allowedFields = ["category", "status"];
const filters = parseQueryFilters(req.query, allowedFields);

// Use with mongoose
const result = await Product.find(filters);
