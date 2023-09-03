import * as dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import router from "./routes/index.js";
import apiResponseMiddleware from "./middleware/apiResponseMiddleware.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(
    fileUpload({
        useTempFiles: true
    })
);
app.use("/api", router);
app.use(apiResponseMiddleware);

/*if (process.env.NODE_ENV === "production") {
    app.use(express.static("../client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });
}*/

if (process.env.NODE_ENV === "production") {
    app.use("/", express.static(path.resolve(__dirname, "client")))

    const indexPath = (path.resolve(__dirname, "client", index.html))

    app.get('*', (req, res) => {
        res.sendFile(indexPath)
    });
}

async function start() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.log(e.message);
        process.exit(1);
    }
}

start();
