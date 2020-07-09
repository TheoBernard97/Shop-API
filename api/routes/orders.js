const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Order = require("../models/order");
const Product = require("../models/product");

// Show all oders
router.get("/", (req, res, next) => {
  Order.find()
    .populate("product", "name")
    .exec()
    .then((data) => {
      const response = {
        count: data.length,
        orders: data.map((doc) => {
          return {
            _id: doc._id,
            product: doc.product,
            quantity: doc.quantity,
            request: {
              type: "GET",
              url: "http://localhost:5000/orders/" + doc._id,
            },
          };
        }),
      };

      res.status(200).json({ response });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// Add a new order
router.post("/", (req, res, next) => {
  Product.findById(req.body.productId)
    .then((product) => {
      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }
      const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId,
      });
      return order.save();
    })
    .then((data) => {
      res.status(201).json({
        message: "Order stored",
        createdOrder: {
          _id: data._id,
          product: data.product,
          quantity: data.quantity,
        },
        request: {
          type: "GET",
          url: "http://localhost:5000/orders/" + data._id,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// Show a specific order
router.get("/:orderId", (req, res, next) => {
  const id = req.params.orderId;

  Order.findById(id)
    .populate("product", "name price")
    .exec()
    .then((data) => {
      const response = {
        _id: data._id,
        product: data.product,
        quantity: data.quantity,
        request: {
          type: "GET",
          description: "Get all orders",
          url: "http://localhost:5000/orders",
        },
      };

      if (data) {
        res.status(200).json({ response });
      } else {
        res.status(404).json({ message: "Order not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// Cancel a specific order
router.delete("/:orderId", (req, res, next) => {
  const id = req.params.orderId;

  Order.remove({ _id: id })
    .exec()
    .then((data) => {
      if (data) {
        res.status(200).json({
          message: "Order canceled",
          request: {
            type: "GET",
            description: "Get all orders",
            url: "http://localhost:5000/orders",
          },
        });
      } else {
        res.status(404).json({ message: "Order not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;
