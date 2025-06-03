import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/user.Route.js";
import productRouter from "./routes/product.Route.js";
import cartRouter from "./routes/cart.Route.js";
import orderRouter from "./routes/order.Route.js";
import connectDB from "./config/mongodb.js";


//App config
const app = express();
const port = process.env.PORT || 8000;
connectDB();
connectCloudinary();

//Middlewares
app.use(express.json());
app.use(cors()); //access backend from frontend

//api endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);


app.listen(port, () => {
  console.log("server is running on : ", port);
});
