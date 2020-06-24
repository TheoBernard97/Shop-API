const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Product = require("../models/product");

// Show every products
router.get("/", (req, res, next) => {
  Product.find()
    .select("_id name price")
    .exec()
    .then((data) => {
      const response = {
        count: data.length,
        products: data.map((doc) => {
          return {
            _id: doc._id,
            name: doc.name,
            price: doc.price,
            request: {
              type: "GET",
              url: "http://localhost:5000/products/" + doc._id,
            },
          };
        }),
      };

      res
        .status(200)
        .json({ message: "Handling GET request to /products", response });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// Add a new product
router.post("/", (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  });

  product
    .save()
    .then((data) => {
      res.status(201).json({
        message: "Created product successfully",
        createdProduct: {
          _id: data._id,
          name: data.name,
          price: data.price,
          request: {
            type: "GET",
            url: "http://localhost:5000/products/" + data._id,
          },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// Show a specific product
router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;

  Product.findById(id)
    .select("_id name price")
    .exec()
    .then((data) => {
      if (data) {
        res.status(200).json({
          product: data,
          request: {
            type: "GET",
            description: "Get all products",
            url: "http://localhost:5000/products",
          },
        });
      } else {
        res.status(404).json({ message: "ID not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// Edit a specific product
router.patch("/:productId", (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};

  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }

  Product.update({ _id: id }, { $set: updateOps })
    .exec()
    .then((data) => {
      if (data) {
        res.status(200).json({
          message: "Product updated",
          url: "http://localhost:5000/products/" + id,
        });
      } else {
        res.status(404).json({ message: "ID not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// Delete a specific product
router.delete("/:productId", (req, res, next) => {
  const id = req.params.productId;

  Product.remove({ _id: id })
    .exec()
    .then((data) => {
      if (data) {
        res.status(200).json({
          message: "Product deleted",
        });
      } else {
        res.status(404).json({ message: "ID not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;
