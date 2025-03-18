import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { listOrders, placeOrder, placeOrderCod, saveOrder, updateStatus, userOrders } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.get("/list", listOrders);
orderRouter.post("/place", authMiddleware, placeOrder);  // Razorpay Integration
orderRouter.post("/status", updateStatus);
orderRouter.post("/placecod", authMiddleware, placeOrderCod);
orderRouter.post("/saveorder", authMiddleware, saveOrder);  // Save order after payment
orderRouter.post("/userorders",authMiddleware,userOrders);

export default orderRouter;
