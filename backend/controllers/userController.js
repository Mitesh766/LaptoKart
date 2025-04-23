import asyncHandler from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";
import User from "../models/userSchema.js";
import validator from "validator";

import { validateUserData } from "../utils/validate.js";

export const login = asyncHandler(async (req, res) => {
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
    message: "User logged in successfully",
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

export const signup = asyncHandler(async (req, res) => {
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
    message: "User created successfully",
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

export const getProfile = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Data fetched successfully",
    data: req.user,
  });
});

export const updateProfile = asyncHandler(async (req, res) => {

  if (!req.body || !req.body.username || !req.body.email || !req.body.address) {
    res.status(400);
    throw new Error("Please fill all the details");
  }

  const { name, email, address } = req.body;

  if (!validator.isEmail(email)) {
    res.status(400);
    throw new Error("Invalid email address");
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("No such user exists");
  }

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




