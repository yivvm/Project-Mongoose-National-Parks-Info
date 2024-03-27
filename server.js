require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

// connect to DB
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to database"));

app.use(express.json());

const parksInfoRouter = require("./routes/parks");
app.use("/parks", parksInfoRouter);

const imagesRouter = require("./routes/images");
app.use("/images", imagesRouter);

app.listen(3001, () => console.log("server started on port 3001"));
