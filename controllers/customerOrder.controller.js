const CustomerOrder = require("../models/CustomerOrder");

// CREATE ORDER
exports.createOrder = async (req, res) => {
  try {
    const { customer, orderItems, amount, paymentMethod } = req.body;

    const newOrder = new CustomerOrder({
      customer,
      orderItems,
      amount,
      paymentMethod
    });

    await newOrder.save();

    res.status(201).json({ success: true, message: "Order Created", order: newOrder });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// GET ORDERS BY CUSTOMER
exports.getCustomerOrders = async (req, res) => {
  try {
    const customerId = req.params.customerId;

    const orders = await CustomerOrder.find({ customer: customerId })
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, orders });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
