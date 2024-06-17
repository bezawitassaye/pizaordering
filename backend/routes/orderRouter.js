import express from "express";
import authMiddleware from "../middleware/auth.js";
import { placeOrder,verifyOrder,userOrders,listOrders,updateStatus } from "../controlleers/orderController.js";
const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify",  verifyOrder);
orderRouter.post("/orders", authMiddleware, userOrders);
orderRouter.get("/list",listOrders)
orderRouter.post("/status",updateStatus)
export default orderRouter;
