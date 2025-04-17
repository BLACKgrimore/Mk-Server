# 🔤 generateSlug Utility

## Overview
The `generateSlug` utility uses the `slugify` package to convert strings into URL-friendly slugs.

---

## 🔧 Installation

```bash
npm install slugify
```

---

## 💻 Usage

```js
import { generateSlug } from "./utils/generateSlug.js";

const title = "Hello World! This is a post";
const slug = generateSlug(title); // Output: "hello-world-this-is-a-post"
```

---

## 📌 Why Use It?

- Useful for blog URLs, product slugs, and SEO-friendly routing.
- Removes special characters and converts to lowercase.