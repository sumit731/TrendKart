import express from "express";
import adminAuth from "../middleware/adminAuth.middleware.js";
import {
  allOrders,
  placeOrder,
  placeOrderRazorpay,
  placeOrderStripe,
  updateStatus,
  userOrders,
  verifyRazorpay,
  verifyStripe,
} from "../controllers/order.Controller.js";
import authUser from "../middleware/auth.middlewear.js";
const orderRouter = express.Router();

//admin Features
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post('/status', adminAuth,updateStatus);

//payment Features
orderRouter.post('/place', authUser, placeOrder);
orderRouter.post('/stripe', authUser, placeOrderStripe);
orderRouter.post('/razorpay', authUser, placeOrderRazorpay);

//user Features
orderRouter.post('/userOrders', authUser, userOrders);

// verify stripe payment
orderRouter.post("/verifyStripe", authUser, verifyStripe);
orderRouter.post("/verifyRazorpay", authUser, verifyRazorpay);
export default orderRouter;