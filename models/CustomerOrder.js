// const mongoose = require("mongoose");

// const CustomerOrderSchema = new mongoose.Schema({
//   customer: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Customer",
//     required: true
//   },
//   orderItems: [
//     {
//       productName: String,
//       price: Number,
//       qty: Number
//     }
//   ],
//   amount: Number,
//   orderStatus: {
//     type: String,
//     default: "Pending"  // Pending, Confirmed, Shipped, Delivered, Cancelled
//   },
//   paymentMethod: {
//     type: String,
//     default: "COD"
//   }
// }, { timestamps: true });

// module.exports = mongoose.model("CustomerOrder", CustomerOrderSchema);   









// const mongoose = require("mongoose");

// const CustomerOrderSchema = new mongoose.Schema({
//   customer: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Customer",
//     required: true
//   },
//   orderItems: [
//     {
//       productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
//       productName: { type: String, required: true },
//       price: { type: Number, required: true },
//       qty: { type: Number, required: true }
//     }
//   ],
//   amount: { type: Number, required: true },
//   orderStatus: {
//     type: String,
//     enum: ["Pending", "Confirmed", "Processing", "Shipped", "Delivered", "Cancelled"],
//     default: "Pending"
//   },
//   paymentMethod: {
//     type: String,
//     enum: ["COD", "Razorpay", "UPI", "Cards"],
//     default: "COD"
//   },
//   paymentStatus: {
//     type: String,
//     enum: ["Pending", "Completed", "Failed"],
//     default: "Pending"
//   },
//   shippingAddress: {
//     name: { type: String, required: true },
//     phone: { type: String, required: true },
//     email: { type: String },
//     address: { type: String, required: true },
//     city: { type: String, required: true },
//     state: { type: String, required: true },
//     pincode: { type: String, required: true }
//   }
// }, { timestamps: true });

// module.exports = mongoose.model("CustomerOrder", CustomerOrderSchema);








// const mongoose = require("mongoose");

// const CustomerOrderSchema = new mongoose.Schema({
//   customer: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Customer",
//     required: true
//   },
//   orderItems: [
//     {
//       productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
//       productName: { type: String, required: true },
//       price: { type: Number, required: true },
//       qty: { type: Number, required: true }
//     }
//   ],
//   amount: { type: Number, required: true },
//   orderStatus: {
//     type: String,
//     enum: ["Pending", "Confirmed", "Processing", "Shipped", "Delivered", "Cancelled"],
//     default: "Pending"
//   },
//   paymentMethod: {
//     type: String,
//     enum: ["COD", "Razorpay", "UPI", "Cards"],
//     default: "COD"
//   },
//   paymentStatus: {
//     type: String,
//     enum: ["Pending", "Completed", "Failed"],
//     default: "Pending"
//   },
//   shippingAddress: {
//     name: { type: String, required: true },
//     phone: { type: String, required: true },
//     email: { type: String },
//     address: { type: String, required: true },
//     city: { type: String, required: true },
//     state: { type: String, required: true },
//     pincode: { type: String, required: true }
//   }
// }, { timestamps: true });

// module.exports = mongoose.model("CustomerOrder", CustomerOrderSchema);











const mongoose = require("mongoose");

const CustomerOrderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true
  },
  orderItems: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      productName: { type: String, required: true },
      price: { type: Number, required: true },
      qty: { type: Number, required: true }
    }
  ],
  amount: { type: Number, required: true },
  orderStatus: {
    type: String,
    enum: ["Pending", "Confirmed", "Processing", "Shipped", "Delivered", "Cancelled"],
    default: "Pending"
  },
  paymentMethod: {
    type: String,
    enum: ["COD", "Razorpay", "UPI", "Cards"],
    default: "COD"
  },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Completed", "Failed"],
    default: "Pending"
  },
  shippingAddress: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true }
  }
}, { timestamps: true });

module.exports = mongoose.model("CustomerOrder", CustomerOrderSchema);
