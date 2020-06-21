const express = require("express");
const router = express.Router();

// Show every products
router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling GET request to /products",
  });
});

// Add a new product
router.post("/", (req, res, next) => {
  res.status(201).json({
    message: "Handling POST request to /products",
  });
});

// Show a specific product
router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;

  res.status(200).json({
    message: "Handling GET request with an ID to /products",
  });
});

// Edit a specific product
router.patch("/:productId", (req, res, next) => {
  res.status(200).json({
    message: "Handling PATCH request with an ID to /products",
  });
});

// Delete a specific product
router.delete("/:productId", (req, res, next) => {
  res.status(200).json({
    message: "Handling DELETE request with an ID to /products",
  });
});

module.exports = router;
