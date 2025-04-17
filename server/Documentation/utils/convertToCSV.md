# 📄 convertToCSV Utility

## Overview
Converts an array of objects into a properly formatted CSV string.

---

## 📦 How to Use

```js
import { convertToCSV } from "./utils/convertToCSV.js";

const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" }
];

const csv = convertToCSV(users);
console.log(csv);
