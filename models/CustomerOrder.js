const mongoose = require("mongoose");

const CustomerOrderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true
  },
  orderItems: [
    {
      productName: String,
      price: Number,
      qty: Number
    }
  ],
  amount: Number,
  orderStatus: {
    type: String,
    default: "Pending"  // Pending, Confirmed, Shipped, Delivered, Cancelled
  },
  paymentMethod: {
    type: String,
    default: "COD"
  }
}, { timestamps: true });

module.exports = mongoose.model("CustomerOrder", CustomerOrderSchema);
