
# ☁️ CloudinaryService.js - Documentation

## Overview

`cloudinaryService.js` is a utility module designed to handle all Cloudinary-related operations in a clean, reusable, and production-ready manner. It supports **file uploads (both local and buffer-based)**, **media deletions**, and **transformed URL generation**. Optimized for use with **Express.js** and **Mongoose** in Node.js environments.

---

## 🔧 Setup Instructions

### 1. Install Dependencies

```bash
npm install cloudinary
```

### 2. Configure Environment Variables

Set up your `.env` file with your Cloudinary credentials:

```env
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

---

## 📦 Exports

```js
import {
  uploadLocalFile,
  uploadBuffer,
  deleteFromCloudinary,
  getImageUrl
} from "./services/cloudinaryService.js";
```

---

## 📤 `uploadLocalFile(localFilePath, options = {})`

Uploads a file from the local file system to Cloudinary.

### Parameters

| Name            | Type     | Description                                         |
|-----------------|----------|-----------------------------------------------------|
| `localFilePath` | `string` | Absolute path of the file on your server            |
| `options`       | `object` | Optional upload options like `folder`, `public_id` |

### Example

```js
const response = await uploadLocalFile("/tmp/avatar.png", {
  folder: "users",
  public_id: "user_123_avatar"
});
console.log(response.secure_url);
```

---

## 📥 `uploadBuffer(buffer, options = {})`

Uploads a file from a buffer (great for in-memory uploads with Multer).

### Parameters

| Name      | Type     | Description                          |
|-----------|----------|--------------------------------------|
| `buffer`  | `Buffer` | File buffer                          |
| `options` | `object` | Cloudinary upload options            |

### Example

```js
const result = await uploadBuffer(req.file.buffer, { folder: "posts" });
console.log(result.secure_url);
```

---

## 🗑 `deleteFromCloudinary(publicId)`

Deletes a file from Cloudinary using its `public_id`.

### Parameters

| Name       | Type     | Description                          |
|------------|----------|--------------------------------------|
| `publicId` | `string` | Cloudinary `public_id` of the file   |

### Example

```js
await deleteFromCloudinary("users/user_123_avatar");
```

---

## 🌐 `getImageUrl(publicId, options = {})`

Returns a transformed, optimized image URL from Cloudinary.

### Parameters

| Name       | Type     | Description                                         |
|------------|----------|-----------------------------------------------------|
| `publicId` | `string` | Cloudinary public ID                                |
| `options`  | `object` | Transform options (`width`, `crop`, `quality`, etc.)|

### Example

```js
const url = getImageUrl("posts/post_42", { width: 300, crop: "fill" });
console.log(url);
```

---

## 🔐 Error Handling

- Logs detailed errors on upload or deletion failure.
- Deletes local files if uploads fail (cleanup).
- Returns `null` in case of failures, enabling you to handle gracefully.

---

## ✅ Production-Ready Features

- ✅ Local file cleanup after upload
- ✅ Support for buffer-based uploads (Multer)
- ✅ Optional foldering and public_id naming
- ✅ Default transformations for optimization
- ✅ Cloudinary SDK `v2` usage with secure URL generation
- ✅ Safe error logs and control

---

## 🧩 Future Enhancements (Optional)

| Feature                   | Description                                                             |
|---------------------------|-------------------------------------------------------------------------|
| 📽 Video Upload Support    | Extend `uploadBuffer` or `uploadLocalFile` with `resource_type: "video"` |
| 🧪 Webhook Signature Check | Validate Cloudinary webhooks                                            |
| 📁 Folder Utilities        | Auto-generate folders based on user, model, or request context          |
| 🔒 Signed Upload URLs      | Enable secure client-side uploads                                       |

---

## 💡 Example with Multer

```js
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });

app.post("/upload", upload.single("file"), async (req, res) => {
  const result = await uploadBuffer(req.file.buffer, {
    folder: "uploads"
  });
  res.json({ url: result?.secure_url });
});
```

---

## 📂 Related Files

- `cloudinaryService.js` — Main service file
- `.env` — Add your Cloudinary credentials
- `multer` (optional) — File upload parsing for Express
