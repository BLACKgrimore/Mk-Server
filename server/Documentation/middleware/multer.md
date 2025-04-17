
# 📦 multer.middleware.js.js - Multer Upload Middleware Documentation

## Overview

This module provides a **production-ready Multer configuration** for handling file uploads in an Express.js application. It supports:

- ✅ Unique file naming to prevent collisions
- ✅ File type validation
- ✅ File size limits
- ✅ Local disk storage (temporary, if uploading to a service like Cloudinary/S3)
- ✅ Easy integration with routes and controllers

---

## 🔧 Installation

```bash
npm install multer uuid
```

---

## 📁 File Structure

```
project-root/
│
├── public/
│   └── temp/              # Temporary folder for file uploads
│
├── middleware/
│   └── multer.middleware.js    # Multer configuration file
```

---

## ⚙️ Configuration

### `multer.middleware.js`

```js
import multer from "multer";
import { v4 as uuid } from 'uuid';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = `${file.fieldname}-${uuid()}${ext}`;
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file type."), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});
```

---

## 📤 How to Use in Routes

```js
import express from 'express';
import { upload } from './middleware/multer.middleware.js.js';

const router = express.Router();

router.post('/upload', upload.single('file'), (req, res) => {
  res.status(200).json({
    success: true,
    message: "File uploaded successfully",
    file: req.file
  });
});
```

---

## 🧹 Optional Cleanup

If you're uploading the file to a remote service (like Cloudinary), delete the local file after the upload:

```js
import fs from 'fs';

fs.unlink(req.file.path, err => {
  if (err) console.error("Failed to delete file:", err);
});
```

---

## 📌 Notes

- You can customize `fileFilter` to support more file types (PDFs, videos, etc.).
- You can switch to `multer.memoryStorage()` if using buffers for in-memory uploads (good for direct upload to cloud).
- Always validate and sanitize file inputs for security.

---

## 🛡 Best Practices

| Best Practice                        | Why It Matters                                      |
|-------------------------------------|-----------------------------------------------------|
| Use UUIDs or timestamps             | Prevent filename collisions                         |
| Validate file types                 | Protect against malicious uploads                   |
| Limit file size                     | Avoid memory or disk overuse                        |
| Store files temporarily             | Offload to cloud storage, clean up afterward        |
