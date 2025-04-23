import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcrypt";
import User from "../models/userSchema.js";

const login = asyncHandler(async (req, res) => {
  if (!req.body) {
    res.status(400);
    throw new Error("Please fill all the details");
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("No such user exists");
  }

  const isValidUser = await bcrypt.compare(password, user.password);

  if (!isValidUser) {
    res.status(400);
    throw new Error("Invalid credentials");
  }

  const token = user.generateAuthToken();

  
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", 
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  });

 
  const { password: _, ...userData } = user.toObject();

  res.json({
    message: "Successfully logged in",
    data: userData,
  });
});

export default login;
