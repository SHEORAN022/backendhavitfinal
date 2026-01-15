 const axios = require("axios");
const CustomerOrder = require("../models/CustomerOrder");
const Payment = require("../models/paymentModel");

/* ================= CREATE CASHFREE ORDER ================= */
exports.createCashfreeOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "OrderId is required"
      });
    }

    const order = await CustomerOrder.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Customer order not found"
      });
    }

    const cashfreeUrl =
      process.env.CASHFREE_ENV === "PROD"
        ? "https://api.cashfree.com/pg/orders"
        : "https://sandbox.cashfree.com/pg/orders";

    const payload = {
  order_id: `${order._id}-${Date.now()}`,
  order_amount: order.amount,
  order_currency: "INR",
  customer_details: {
    customer_id: order._id.toString(),
    customer_email: order.shippingAddress.email || "test@test.com",
    customer_phone: order.shippingAddress.phone || "9999999999",
    customer_name: order.shippingAddress.name || "Test User"
  }
};

const response = await axios.post(cashfreeUrl, payload, {
  headers: {
    "x-client-id": process.env.CASHFREE_APP_ID,
    "x-client-secret": process.env.CASHFREE_SECRET_KEY,
    "x-api-version": "2022-09-01",
    "Content-Type": "application/json"
  }
});

    await Payment.create({
      gateway: "CASHFREE",
      gatewayOrderId: response.data.order_id,
      customerOrderId: order._id,
      amount: order.amount,
      status: "PENDING"
    });

    return res.json({
      success: true,
      paymentSessionId: response.data.payment_session_id,
      cashfreeOrderId: response.data.order_id
    });

  } catch (err) {
    console.error("Cashfree create error:", err.response?.data || err.message);
    return res.status(500).json({
      success: false,
      message: "Cashfree order creation failed"
    });
  }
};
