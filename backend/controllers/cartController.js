import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/userSchema.js";

export const getCart = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate("cart.productId");
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  user.cart.forEach((item) => {
    item.pricePerItem = item.productId.price;
    item.totalItemPrice = item.quantity * item.productId.price;
  });

  const totalCartValue = user.cart.reduce(
    (acc, item) => acc + item.totalItemPrice,
    0
  );

  res.status(200).json({
    message: "Cart details fetched successfully",
    data: {
      cart: user.cart,
      totalCartValue,
    },
  });
});

export const addToCart = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  if (!productId) {
    res.status(404);
    throw new Error("No product Id found");
  }
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const existingItemIndex = user.cart.findIndex(
    (item) => item.productId.toString() === productId
  );

  if (existingItemIndex > -1) {
    res.status(400).json({
      message: "Product already exists in the cart",
    });
  }

  user.cart.push({ productId, quantity: 1 });
  await user.save();
  res.status(201).json({
    message: "Product successfully added to cart",
  });
});

export const updateCart = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const { productId } = req.params;
  const { quantity } = req.body;

  if (!productId) {
    res.status(400);
    throw new Error("Please enter a  product ID");
  }

  if (typeof quantity !== "number" || quantity < 1) {
    res.status(400);
    throw new Error("Quantity must be a number greater than 0");
  }

  const existingItemIndex = user.cart.findIndex(
    (item) => item.productId.toString() === productId
  );

  if (existingItemIndex === -1) {
    res.status(404);
    throw new Error("Product not found in the cart");
  }

  user.cart[existingItemIndex].quantity = quantity;

  await user.save();

  res.status(200).json({
    message: "Cart successfully updated",
  });
});

export const removeFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  if (!productId) {
    res.status(400); 
    throw new Error("Please provide a product Id");
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.cart = user.cart.filter(
    (item) => item.productId.toString() !== productId
  );

  await user.save();

  res.status(200).json({
    message: "Item successfully removed from cart",
  });
});
