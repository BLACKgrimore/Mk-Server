# 🚀 Mk-Server – Scalable Express + Mongoose Backend Template

A fully-structured, scalable, and production-ready backend template built with **Express.js**, **Mongoose**, and **MongoDB**, designed to get your REST API up and running in no time – whether it's for a side project, production system, or an npm package starter kit.

---

## 🔥 Features

- ✅ Express.js based routing and middleware setup
- ✅ MongoDB connection with Mongoose (with transactions support)
- ✅ Cloudinary file upload (production ready)
- ✅ Async handler utility to reduce try/catch boilerplate
- ✅ Centralized error and response handler classes
- ✅ Auto JSON response format
- ✅ Multer-based file upload system
- ✅ Rate Limiting and security middlewares (`helmet`, `hpp`, `xss-clean`)
- ✅ Centralized environment config
- ✅ Built-in support for logging and debugging
- ✅ Pagination, filtering, metadata-ready
- ✅ Prettier and lint-friendly
- ✅ Ready to publish as an npm starter

---

## 📁 Folder Structure

```
src/
├── app.js                     # Main Express config
├── index.js                   # Entry point
├── config/                    # Env + constants
├── db/                        # MongoDB connection
├── middlewares/              # Rate limiters, errors, etc.
├── utils/                     # Async handler, response wrapper, etc.
├── routes/                    # All routes (modular)
├── controllers/              # Route logic
├── models/                   # Mongoose models
├── uploads/                  # Multer temp files
├── public/                   # Static assets
├── Documentation/            # docs for all the listed things
└── bin/cli.js                # NPM starter entry (optional)
```

---

## ⚙️ Environment Variables (`.env`)

```env
PORT=8080
MONGO_URI=mongodb+srv://your-cluster-url
CORS_ORIGIN=http://localhost:3000

ACCESS_TOKEN_SECRET=your-access-secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your-refresh-secret
REFRESH_TOKEN_EXPIRY=30d

CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-secret
```

---

## 🛠️ Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `npm run dev` | Start server in development (nodemon) |
| `start` | `node src/index.js` | Start server in production |
| `lint` | `prettier --check .` | Check formatting |
| `format` | `prettier --write .` | Auto-format code |

---

## 💡 Usage Example

```bash
npm install
npm run dev
```

## 📦 Publishing as NPM Starter (Optional)

To use as a CLI tool for bootstrapping projects:

```bash
npm link
create-mk-backend new my-project
```

Or publish to NPM with your CLI tool defined in `bin/cli.js`.

---

## 🤝 Contributing

Feel free to fork this repo, suggest improvements, or contribute new utilities.

---

## 📜 License

Licensed under the ISC License.  
© 2024 [Manoj Kumar Rajpoot](https://github.com/BLACKgrimore)

---

## 📌 Related Tools

- [Express.js](https://expressjs.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Cloudinary](https://cloudinary.com/)
- [Mongoose](https://mongoosejs.com/)