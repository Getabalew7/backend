const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const Product = require("./models/product");
const app = express();
app.use(bodyParser.json());
mongoose
  .connect(
    "mongodb+srv://username:password@cluster0.qbbojse.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Successfully connected to mongo DB Atlas!");
  })
  .catch((error) => {
    console.log("Unable to connect to the Mongoose database");
    console.log(error);
  });
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

app.get("/api/products", (req, res, next) => {
    Product.find()
      .then((product) => {
        res.status(200).json({
            products:product
        });
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  });
app.get("/api/products/:id", (req, res, next) => {
    Product.findOne({
      _id: req.params.id,
    })
      .then((product) => {
        res.status(200).json({
            product:product
        });
      })
      .catch((error) => {
        res.status(404).json({
          error: error,
        });
      });
  });

  app.post("/api/products", (req, res, next) => {
    const product   = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      inStock: req.body.inStock,
    });
  
    product
      .save()
      .then(() => {
        res.status(201).json({
          product: product,
        });
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  });
  app.put("/api/products/:id", (req, res, next) => {
    const product = new Product({
      _id: req.params.id,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      inStock: req.body.inStock,
    });
    Product.updateOne({ _id: req.params.id }, product)
      .then(() => {
        res.status(201).json({
            message: 'Modified!',
        });
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  });
  app.delete("/api/products/:id", (req, res, next) => {
    Product.deleteOne({ _id: req.params.id })
      .then(() => {
        res.status(200).json({
          message: "Deleted!",
        });
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  });
module.exports = app;
