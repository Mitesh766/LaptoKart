import asyncHandler from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";
import User from "../models/userSchema.js";
import Product from "../models/productSchema.js";
import validator from "validator";
import Order from "../models/orderSchema.js";

import { validateUserData } from "../utils/validate.js";

export const loginUser = asyncHandler(async (req, res) => {
  if (!req?.body || !req?.body?.email || !req?.body?.password) {
    res.status(400);
    throw new Error("Please fill all details");
  }

  const { email, password } = req.body;

  validateUserData({ email, password, res });

  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("No such user exists , please Sign Up");
  }

  const isUserValid = await bcrypt.compare(password, user.password);
  if (!isUserValid) {
    res.status(400);
    throw new Error("Invalid credentials");
  }

  const token = user.generateAuthToken();

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });

  res.status(200).json({
    message: "User logged in  successfully",
    data: {
      userData: {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        address: user.address,
      },
      cartCount: user.cart.length,
      wishlistCount: user.wishlist.length,
    },
  });
});

export const registerUser = asyncHandler(async (req, res) => {
  if (
    !req?.body ||
    !req?.body?.email ||
    !req?.body?.password ||
    !req?.body?.name
  ) {
    res.status(400);
    throw new Error("Please fill all details");
  }
  const { name, email, password } = req.body;

  validateUserData({ email, password, res });

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists, please login");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  const token = user.generateAuthToken();

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });

  await user.save();

  res.status(201).json({
    message: "User registered successfully",
    data: {
      userData: {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        address: user.address,
      },
      cartCount: user.cart.length,
      wishlistCount: user.wishlist.length,
    },
  });
});

export const getProfile = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Data fetched successfully",
    data: req.user,
  });
});

export const getUserData = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select(
    "name email isAdmin cart wishlist  address"
  );

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({
    message: "User data fetched successfully",
    data: {
      userData: {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        address: user.address,
      },
      cartCount: user.cart.length,
      wishlistCount: user.wishlist.length,
    },
  });
});

export const updateProfile = asyncHandler(async (req, res) => {
  if (!req.body || !req.body.name || !req.body.email || !req.body.address) {
    res.status(400);
    throw new Error("Please fill all the details");
  }

  const { name, email, address } = req.body;
  const { street, city, state, pincode, country } = address;

  if (!street || !city || !state || !pincode || !country) {
    res.status(400);
    throw new Error("Please fill the complete address");
  }

  if (!validator.isEmail(email)) {
    res.status(400);
    throw new Error("Invalid email address");
  }

  const user = req.user;

  user.name = name || user.name;
  user.email = email || user.email;
  user.address = address;

  const updatedData = await user.save();
  res.status(200).json({
    message: "User Updated Successfully",
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
    },
  });
});

export const getWishList = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
    .populate("wishlist.productId")
    .select("wishlist");
  res.status(200).json({
    message: "Wishlist fetched successfully",
    data: user.wishlist,
  });
});

export const addToWishList = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const productExists = await Product.findById(productId);
  if (!productExists) {
    res.status(404);
    throw new Error("No such product exists");
  }
  const user = await User.findById(req.user._id);

  if (user.wishlist.some((item) => productId === item.productId.toString())) {
    res.status(400);
    throw new Error("Product is already in your wishlist");
  }

  user.wishlist.push({ productId });
  await user.save();

  res.status(201).json({
    message: "Product successfully added to wishlist",
  });
});

export const removeFromWishList = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const user = await User.findById(req.user._id).select("wishlist");

  if (!user.wishlist.some((item) => item.productId.toString() === productId)) {
    res.status(404);
    throw new Error("No such product in wishlist");
  }
  user.wishlist = user.wishlist.filter(
    (item) => item.productId.toString() !== productId
  );
  await user.save();
  res.status(200).json({
    message: "Product successfully removed from wishlist",
  });
});

export const getOrders = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
    .populate("orders.productId")
    .select("orders");
  res.status(200).json({
    message: "Orders fetched successfully",
    data: user.orders,
  });
});
