const express = require("express");
const router = express.Router();

// Show every oders
router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling GET request to /orders",
  });
});

// Add a new order
router.post("/", (req, res, next) => {
  res.status(201).json({
    message: "Handling POST request to /orders",
  });
});

// Show a specific order
router.get("/:orderId", (req, res, next) => {
  const id = req.params.orderId;

  res.status(200).json({
    message: "Handling GET request with an ID to /orders",
  });
});

// Cancel a specific order
router.delete("/:orderId", (req, res, next) => {
  const id = req.params.orderId;

  res.status(200).json({
    message: "Handling DELETE request with an ID to /orders",
  });
});

module.exports = router;
