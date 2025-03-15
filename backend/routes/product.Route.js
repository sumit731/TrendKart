import express, { Router } from "express";
import {addProduct, listProducts, removeProduct, singleProduct} from "../controllers/product.Controller.js";
import upload from "../middleware/multer.middleware.js";
import adminAuth from "../middleware/adminAuth.middleware.js";

const productRouter = express.Router();

productRouter.post(
  "/addProduct",adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 }
  ]),
  addProduct
);
productRouter.post("/removeProduct",adminAuth, removeProduct);
productRouter.post("/singleProduct", singleProduct);
productRouter.get("/listProducts", listProducts);

export default productRouter;


