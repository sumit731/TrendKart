import express from "express";
import cors from "cors";
import "dotenv/config";
import connnectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/user.Route.js";
import productRouter from "./routes/product.Route.js";


//App config
const app = express();
const port = process.env.PORT || 4000;
connnectDB();
connectCloudinary();

//Middlewares
app.use(express.json());
app.use(cors()); //access backend from frontend

//api endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);


app.listen(port, () => {
  console.log("server is running on : ", port);
});
