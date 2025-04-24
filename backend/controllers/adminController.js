import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/userSchema.js";

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("name email address isAdmin createdAt").sort({
    createdAt:-1
  });
  res.status(200).json({
    message: "User data fetched successfully",
    data: users,
  });
});
