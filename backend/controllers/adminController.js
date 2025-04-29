import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/userSchema.js";
import Product from "../models/productSchema.js";
import cloudinary from "../config/cloudinary.js";

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
    .select("name email address isAdmin createdAt")
    .sort({
      createdAt: -1,
    });
  res.status(200).json({
    message: "User data fetched successfully",
    data: users,
  });
});


export const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    brand,
    description,
    price,
    countInStock,
    category,
    processor,
    ram,
    storage,
    screenSize,
    graphicsCard,
    operatingSystem,
  } = req.body;

  if (!name || !brand || !description || !price || !countInStock || !category) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  if (!req?.file?.path) {
    res.status(400);
    throw new Error("Image is required");
  }

  const image = req.file.path;

  const product = new Product({
    name,
    brand,
    description,
    price,
    countInStock,
    category,
    processor,
    ram,
    storage,
    screenSize,
    graphicsCard,
    operatingSystem,
    image: [image],
  });

  const createdProduct = await product.save();

  res.status(201).json({
    message: "Product created successfully",
    data: createdProduct,
  });
});

export const updateProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  if (!productId) {
    res.status(400);
    throw new Error("Product ID not provided");
  }

  const {
    name,
    brand,
    description,
    price,
    countInStock,
    category,
    processor,
    ram,
    storage,
    screenSize,
    graphicsCard,
    operatingSystem,
  } = req.body;

  if (!name || !brand || !description || !price || !countInStock || !category) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  const product = await Product.findById(productId);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  product.name = name;
  product.brand = brand;
  product.description = description;
  product.price = price;
  product.countInStock = countInStock;
  product.category = category;
  product.processor = processor;
  product.ram = ram;
  product.storage = storage;
  product.screenSize = screenSize;
  product.graphicsCard = graphicsCard;
  product.operatingSystem = operatingSystem;

  if (req?.file?.path) {
    product.image = [req.file.path]; 
  }

  const updatedProduct = await product.save();

  res.status(200).json({
    message: "Product updated successfully",
    data: updatedProduct,
  });
});
