// const CustomerOrder = require("../models/CustomerOrder");

// // CREATE ORDER
// exports.createOrder = async (req, res) => {
//   try {
//     const { customer, orderItems, amount, paymentMethod } = req.body;

//     const newOrder = new CustomerOrder({
//       customer,
//       orderItems,
//       amount,
//       paymentMethod
//     });

//     await newOrder.save();

//     res.status(201).json({ success: true, message: "Order Created", order: newOrder });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// // GET ORDERS BY CUSTOMER
// exports.getCustomerOrders = async (req, res) => {
//   try {
//     const customerId = req.params.customerId;

//     const orders = await CustomerOrder.find({ customer: customerId })
//       .sort({ createdAt: -1 });

//     res.status(200).json({ success: true, orders });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };











const CustomerOrder = require("../models/CustomerOrder");

// --- CREATE ORDER ---
exports.createOrder = async (req, res) => {
  try {
    const { customer, orderItems, amount, paymentMethod, shippingAddress } = req.body;

    // Basic Validation
    if (!customer || !orderItems || !amount || !shippingAddress) {
      return res.status(400).json({ 
        success: false, 
        message: "Sabhi details (customer, items, amount, address) bhejni zaroori hain." 
      });
    }

    const newOrder = new CustomerOrder({
      customer,
      orderItems,
      amount,
      paymentMethod,
      shippingAddress,
      // Logic: Agar online payment hai toh Completed, warna COD mein Pending
      paymentStatus: paymentMethod === "COD" ? "Pending" : "Completed"
    });

    await newOrder.save();

    res.status(201).json({ 
      success: true, 
      message: "Order Created Successfully", 
      order: newOrder 
    });
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ success: false, message: "Server Error", error: err.message });
  }
};

// --- GET CUSTOMER ORDERS ---
exports.getCustomerOrders = async (req, res) => {
  try {
    const { customerId } = req.params;

    const orders = await CustomerOrder.find({ customer: customerId })
      .sort({ createdAt: -1 });

    res.status(200).json({ 
      success: true, 
      count: orders.length, 
      orders 
    });
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
