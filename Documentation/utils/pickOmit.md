# 🧩 pick & omit Utilities

## Overview
These utilities help you extract or remove specific keys from objects.

---

## 💻 Usage

```js
import { pick, omit } from "./utils/objectHelpers.js";

const user = {
  id: "123",
  name: "John",
  password: "secret",
  email: "john@example.com"
};

const safeUser = pick(user, ["id", "name", "email"]); // includes only these
const noPassword = omit(user, ["password"]); // removes password
```

---

## 📌 Why Use It?

- Create safe response objects.
- Reduce boilerplate for object manipulation.