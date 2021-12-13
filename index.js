const express = require("express");
const mongoose = require("mongoose");
const Book = require("./models/bookModel");
const User = require("./models/userModel");
const bodyParser = require("body-parser");
const bookRouter = require("./routes/bookRouter")(Book);
const userRouter = require("./routes/userRouter")(User);

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/bookAPI");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api", bookRouter);
app.use("/api", userRouter);
app.listen(8080);
