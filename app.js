const express = require("express");
const bodyPasrser = require("body-parser");
const mongoose = require("mongoose");

const stuffRouter= require('./routes/stuff')
const userRouter = require('./routes/user');
const path = require('path')
const app = express();
app.use(bodyPasrser.json());
mongoose
  .connect(
    "mongodb+srv://getch:D7AiDSl1ytSNrPPC@cluster0.qbbojse.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Successfully connected to mongo DB Atlas!");
  })
  .catch((error) => {
    console.log("Unable to connect to the Mongoose database");
    console.log(error);
  });
//app.use(express.json())
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use("/api/stuff", stuffRouter);
app.use('/api/auth', userRouter);
module.exports = app;
