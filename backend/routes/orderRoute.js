import express from "express";
import authMiddleware from "../middleware/auth.js";
import { placeorder, verifyOrder } from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeorder);
orderRouter.post("/verify", verifyOrder);

export default orderRouter;
