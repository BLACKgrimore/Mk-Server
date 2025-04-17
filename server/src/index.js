import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./db/index.js";

dotenv.config({
    path: "./.env"
});

const PORT = process.env.PORT || 8080;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log({
                serverStatus: "🌐  Application is Running",
                URL: `http://localhost:${PORT}`
            });
        });

        app.on("error", (err) => {
            console.error("App Crashed | Error:", err);
        });
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB | Error:", err);
        process.exit(1);
    });