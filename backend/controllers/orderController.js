import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

const placeOrder = async (req, res) => {
  try {
    // Calculate total amount in paise (Razorpay uses paise)
    const totalAmount = req.body.amount * 100; // Convert to paise

    // Create Razorpay Order
    const options = {
      amount: totalAmount,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1, // Auto-capture payment
    };

    const order = await razorpay.orders.create(options);
    console.log("Razorpay Order Created:", order);

    res.json({
      success: true,
      order_id: order.id,
      amount: totalAmount,
      currency: "INR",
    });

  } catch (error) {
    console.error("Razorpay Error:", error);
    res.status(500).json({ success: false, message: "Order creation failed", error });
  }
};

const placeOrderCod = async (req, res) => {

    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
            payment: true,
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        res.json({ success: true, message: "Order Placed" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

const saveOrder = async (req, res) => {
    try {
      const newOrder = new orderModel({
        userId: req.body.userId,
        items: req.body.items,
        amount: req.body.amount,
        address: req.body.address,
        phoneNo: req.body.phone,
        paymentId: req.body.paymentId,
      });
  
      await newOrder.save();
      await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
  
      res.json({ success: true, message: "Order saved successfully!" });
    } catch (error) {
      console.error("Error saving order:", error);
      res.status(500).json({ success: false, message: "Order saving failed", error });
    }
  };

const updateStatus = async (req, res) => {
    console.log(req.body);
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: "Status Updated" })
    } catch (error) {
        res.json({ success: false, message: "Error" })
    }

};

const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
};

const userOrders = async (req, res) => {
  try {
      const orders = await orderModel.find({ userId: req.body.userId });
      res.json({ success: true, data: orders })
  } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error" })
  }
}

export { placeOrder, saveOrder, placeOrderCod, updateStatus, listOrders, userOrders };   