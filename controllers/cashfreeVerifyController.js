const axios = require("axios");
const Payment = require("../models/paymentModel");
const CustomerOrder = require("../models/CustomerOrder");

exports.verifyCashfreePayment = async (req, res) => {
  try {
    const { cashfreeOrderId } = req.body;

    if (!cashfreeOrderId) {
      return res.status(400).json({
        success: false,
        message: "cashfreeOrderId is required"
      });
    }

    const baseUrl =
      process.env.CASHFREE_ENV === "PROD"
        ? "https://api.cashfree.com/pg/orders"
        : "https://sandbox.cashfree.com/pg/orders";

    const response = await axios.get(
      `${baseUrl}/${cashfreeOrderId}`,
      {
        headers: {
          "x-client-id": process.env.CASHFREE_APP_ID,
          "x-client-secret": process.env.CASHFREE_SECRET_KEY,
          "x-api-version": "2022-09-01"
        }
      }
    );

    const orderStatus = response.data.order_status;

    const payment = await Payment.findOne({
      gatewayOrderId: cashfreeOrderId
    });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment record not found"
      });
    }

    if (orderStatus === "PAID") {
      payment.status = "SUCCESS";
      await payment.save();

      await CustomerOrder.findByIdAndUpdate(payment.customerOrderId, {
        paymentStatus: "Completed",
        orderStatus: "Confirmed"
      });

      return res.json({
        success: true,
        message: "Payment verified successfully",
        status: "PAID"
      });
    }

    if (orderStatus === "FAILED") {
      payment.status = "FAILED";
      await payment.save();

      return res.json({
        success: false,
        message: "Payment failed",
        status: "FAILED"
      });
    }

    return res.json({
      success: false,
      message: "Payment pending",
      status: orderStatus
    });

  } catch (err) {
    console.error("Verify error:", err.response?.data || err.message);
    return res.status(500).json({
      success: false,
      message: "Payment verification failed"
    });
  }
};
