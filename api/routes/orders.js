const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling GET request to /orders",
  });
});

router.post("/", (req, res, next) => {
  res.status(201).json({
    message: "Handling POST request to /orders",
  });
});

router.get("/:orderId", (req, res, next) => {
  const id = req.params.orderId;

  res.status(200).json({
    message: "Handling GET request with an ID to /orders",
  });
});

router.delete("/:orderId", (req, res, next) => {
  const id = req.params.orderId;

  res.status(200).json({
    message: "Handling DELETE request with an ID to /orders",
  });
});

module.exports = router;
