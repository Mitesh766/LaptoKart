import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/userSchema.js";

import { getCartData } from "../utils/cartUtils.js";

export const getCart = asyncHandler(async (req, res) => {
  const cartData = await getCartData(req.user._id);
  res.status(200).json({
    message: "Cart details fetched successfully",
    data: cartData,
  });
});

export const addToCart = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  if (!productId) {
    res.status(400);
    throw new Error("No product Id found");
  }

  const user = await User.findById(req.user._id);
 
  const existingItemIndex = user.cart.findIndex(
    (item) => item.productId.toString() === productId
  );

  if (existingItemIndex > -1) {
    res.status(400);
    throw new Error("Product already exists in the cart");
  }

  user.cart.push({ productId, quantity: 1 });
  await user.save();

  const cartData = await getCartData(user._id);
  res.status(200).json({
    message: "Product added to cart",
    data: cartData,
  });
});


export const updateCart = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  

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


  user.cart = user.cart.filter(
    (item) => item.productId.toString() !== productId
  );

  await user.save();

  const cartData = await getCartData(user._id);

  res.status(200).json({
    message: "Item successfully removed from cart",
    data: cartData,
  });
});
