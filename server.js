/** @format */

import express from "express";
import mongoose from "mongoose";
import { PORT, DB_URL } from "./config/index.js";
import errorHandler from "./middleware/errorHandler.js";
import routes from "./routes/user.js";

const app = express();

// middleware ko enable
app.use(express.json());

// register kar rahai hai user_register router ko
app.use("/api", routes);

// DB connection
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error;"));
db.once("open", () => {
    console.log("DB connected...");
});

// use middleware
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
