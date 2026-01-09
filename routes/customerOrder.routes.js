// const express = require("express");
// const router = express.Router();
// const {
//   createOrder,
//   getCustomerOrders
// } = require("../controllers/customerOrder.controller");

// // CREATE ORDER
// router.post("/order/create", createOrder);

// // GET CUSTOMER ORDERS
// router.get("/orders/:customerId", getCustomerOrders);

// module.exports = router;







const express = require("express");
const router = express.Router();
const {
  createOrder,
  getCustomerOrders
} = require("../controllers/customerOrder.controller");

// URL: /api/customer/order/create
router.post("/order/create", createOrder);

// URL: /api/customer/orders/:customerId
router.get("/orders/:customerId", getCustomerOrders);

module.exports = router;
