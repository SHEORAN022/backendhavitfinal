const express = require("express");
const router = express.Router();
const {
  createOrder,
  getCustomerOrders
} = require("../controllers/customerOrder.controller");

// CREATE ORDER
router.post("/order/create", createOrder);

// GET CUSTOMER ORDERS
router.get("/orders/:customerId", getCustomerOrders);

module.exports = router;
