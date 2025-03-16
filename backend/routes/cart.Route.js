import express from "express";
import {
  addToCart,
  getUserCart,
  updateCart,
} from "../controllers/cart.Controller.js";
import authUser from "../middleware/auth.middlewear.js";

const cartRouter = express.Router();

cartRouter.post("/add", authUser, addToCart);
cartRouter.post("/update", authUser, updateCart);
cartRouter.post("/get", authUser, getUserCart);

export default cartRouter;
