import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/userSchema.js";

export const getCart = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({
    message: "Cart details fetched successfully",
    data: user.cart,
  });
});

export const addToCart = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const user = await User.findById(req.user._id);

  const alreadyInCart = user.cart.some(
    (item) => item.productId.toString() === productId
  );

  if (alreadyInCart) {
    res.status(400);
    throw new Error("Product already exists in cart");
  }

  user.cart.push({ productId, quantity: 1 });
  await user.save();

  res.status(201).json({
    message: "Product successfully added to cart",
  });
});
