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











// const CustomerOrder = require("../models/CustomerOrder");

// // --- CREATE ORDER ---
// exports.createOrder = async (req, res) => {
//   try {
//     const { customer, orderItems, amount, paymentMethod, shippingAddress } = req.body;

//     // Basic Validation
//     if (!customer || !orderItems || !amount || !shippingAddress) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Sabhi details (customer, items, amount, address) bhejni zaroori hain." 
//       });
//     }

//     const newOrder = new CustomerOrder({
//       customer,
//       orderItems,
//       amount,
//       paymentMethod,
//       shippingAddress,
//       // Logic: Agar online payment hai toh Completed, warna COD mein Pending
//       paymentStatus: paymentMethod === "COD" ? "Pending" : "Completed"
//     });

//     await newOrder.save();

//     res.status(201).json({ 
//       success: true, 
//       message: "Order Created Successfully", 
//       order: newOrder 
//     });
//   } catch (err) {
//     console.error("Error creating order:", err);
//     res.status(500).json({ success: false, message: "Server Error", error: err.message });
//   }
// };

// // --- GET CUSTOMER ORDERS ---
// exports.getCustomerOrders = async (req, res) => {
//   try {
//     const { customerId } = req.params;

//     const orders = await CustomerOrder.find({ customer: customerId })
//       .sort({ createdAt: -1 });

//     res.status(200).json({ 
//       success: true, 
//       count: orders.length, 
//       orders 
//     });
//   } catch (err) {
//     console.error("Error fetching orders:", err);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };









const CustomerOrder = require("../models/CustomerOrder");

// 1. CREATE ORDER (With Vendor IDs)
exports.createOrder = async (req, res) => {
  try {
    const { customer, orderItems, amount, paymentMethod, shippingAddress } = req.body;

    if (!customer || !orderItems || !amount || !shippingAddress) {
      return res.status(400).json({ success: false, message: "Missing details." });
    }

    const newOrder = new CustomerOrder({
      customer,
      orderItems, // Har item mein vendorId honi chahiye
      amount,
      paymentMethod,
      shippingAddress,
      paymentStatus: paymentMethod === "COD" ? "Pending" : "Completed"
    });

    await newOrder.save();
    res.status(201).json({ success: true, message: "Order Placed!", order: newOrder });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// 2. GET VENDOR SPECIFIC ORDERS (Multi-Vendor Logic)
exports.getVendorOrders = async (req, res) => {
  try {
    const { vendorId } = req.params;

    // Aise orders dhundo jisme is vendor ka productId maujood ho
    const orders = await CustomerOrder.find({
      "orderItems.vendorId": vendorId
    }).sort({ createdAt: -1 });

    // Filter: Vendor ko sirf apna product dikhe, dusre ka nahi
    const vendorSpecificData = orders.map(order => {
      const myItems = order.orderItems.filter(item => item.vendorId.toString() === vendorId);
      return {
        ...order._doc,
        orderItems: myItems,
        totalVendorAmount: myItems.reduce((acc, item) => acc + (item.price * item.qty), 0)
      };
    });

    res.status(200).json({ success: true, count: vendorSpecificData.length, orders: vendorSpecificData });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// 3. GET CUSTOMER ORDERS (As it is)
exports.getCustomerOrders = async (req, res) => {
  try {
    const orders = await CustomerOrder.find({ customer: req.params.customerId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
