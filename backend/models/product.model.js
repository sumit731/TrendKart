import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: Array, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    size: { type: Array, required: true },
    bestSeller: { type: Boolean },
    // date: { type: Number, required: true },
    date: {
      type: Date,
      default: Date.now, // 👈 this line adds the current date automatically
      required: false     // 👈 make it optional
    }
  },
  {
    timestamps: true,
  }
);

const productModel = mongoose.models.Product || mongoose.model("Product", productSchema);
export default productModel;