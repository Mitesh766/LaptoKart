import asyncHandler from "../utils/asyncHandler.js";
import Product from "../models/productSchema.js";

export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.status(200).json({
    message: "Products fetched successfully",
    data: products,
  });
});

export const getProductById = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findOne({ _id: productId });
  if (!product) {
    res.status(404);
    throw new Error("No product found");
  }

  res.status(200).json({
    message: "Product details fetched successfully",
    data: product,
  });
});
