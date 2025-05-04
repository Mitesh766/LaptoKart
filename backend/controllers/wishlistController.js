import User from "../models/userSchema.js";
import Product from "../models/productSchema.js";
import asyncHandler from "../utils/asyncHandler.js";
import { getWishlistData } from "../utils/wishListUtils.js";

export const getWishList = asyncHandler(async (req, res) => {
  const wishlistData = await getWishlistData(req.user._id);
  res.status(200).json({
    message: "Wishlist data fetched successfully",
    wishlistData,
  });
});

export const addToWishList = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const productExists = await Product.findById(productId);
  if (!productExists) {
    res.status(404);
    throw new Error("Product details not found");
  }
  const user = await User.findById(req.user._id);

  if (user.wishlist.some((item) => productId === item.productId.toString())) {
    res.status(400);
    throw new Error("Product is already in your wishlist");
  }

  user.wishlist.push({ productId });
  await user.save();

  const wishlistData = await getWishlistData(req.user._id);
  res.status(201).json({
    message: "Product successfully added to wishlist",
    wishlistData,
  });
});

export const removeFromWishList = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const user = await User.findById(req.user._id);

  if (!user.wishlist.some((item) => item.productId.toString() === productId)) {
    res.status(404);
    throw new Error("Product details not found");
  }
  user.wishlist = user.wishlist.filter(
    (item) => item.productId.toString() !== productId
  );
  await user.save();
  const wishlistData = await getWishlistData(req.user._id);
  res.status(200).json({
    message: "Product successfully removed from wishlist",
    wishlistData,
  });
});
