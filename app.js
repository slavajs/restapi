const express = require("express");
const mongoose = require("mongoose");

const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");
const supportRoutes = require(".routes/support")

const config = require('./config');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, PUT, PATCH, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization"
  });
  next();
});

app.use("/feed", postRoutes);
app.use("/auth", authRoutes);
app.use()

app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    message: error.message,
    status: error.statusCode
  });
  console.log(error);
});


mongoose.set("useFindAndModify", false);
mongoose
  .connect(config.MDB_STRING, {
    useNewUrlParser: true,
    dbName: "apiproject"
  })
  .then(result => app.listen(80))
  .catch(err => console.log(err));
