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







// const express = require("express");
// const router = express.Router();
// const {
//   createOrder,
//   getCustomerOrders
// } = require("../controllers/customerOrder.controller");

// // URL: /api/customer/order/create
// router.post("/order/create", createOrder);

// // URL: /api/customer/orders/:customerId
// router.get("/orders/:customerId", getCustomerOrders);

// module.exports = router;








// const express = require("express");
// const router = express.Router();
// const {
//   createOrder,
//   getCustomerOrders,
//   getVendorOrders // Naya function
// } = require("../controllers/customerOrder.controller");

// // Customer side APIs
// router.post("/order/create", createOrder);
// router.get("/orders/:customerId", getCustomerOrders);

// // --- VENDOR SIDE API ---
// router.get("/vendor-orders/:vendorId", getVendorOrders);

// module.exports = router;









// const express = require("express");
// const router = express.Router();
// const {
//   createOrder,
//   getCustomerOrders,
//   getVendorOrders // Naya function
// } = require("../controllers/customerOrder.controller");

// // Customer side APIs
// router.post("/order/create", createOrder);
// router.get("/orders/:customerId", getCustomerOrders);

// // --- VENDOR SIDE API ---
// router.get("/vendor-orders/:vendorId", getVendorOrders);

// module.exports = router;








// const express = require("express");
// const router = express.Router();
// const { createOrder, getCustomerOrders, getVendorOrders } = require("../controllers/customerOrder.controller");

// // Customer
// router.post("/order/create", createOrder);
// router.get("/orders/:customerId", getCustomerOrders);

// // Vendor
// router.get("/vendor-orders/:vendorId", getVendorOrders);

// module.exports = router;






const express = require("express");
const router = express.Router();

const {
  createOrder,
  getCustomerOrders,
  getOrderById,
  cancelOrder,
  getVendorOrders,
} = require("../controllers/customerOrder.controller");

router.post("/order/create", createOrder);

router.get("/orders/:customerId", getCustomerOrders);

router.get("/order/:id", getOrderById);

router.put("/order/cancel/:id", cancelOrder);

router.get("/vendor-orders/:vendorId", getVendorOrders);

module.exports = router;

