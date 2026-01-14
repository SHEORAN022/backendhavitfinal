const express = require("express");
const router = express.Router();
const { createCashfreeOrder } = require("../controllers/cashfreeController");
const { verifyCashfreePayment } = require("../controllers/cashfreeVerifyController");

/* ================= CASHFREE ================= */
router.post("/create-order", createCashfreeOrder);
router.post("/verify", verifyCashfreePayment);

module.exports = router;
