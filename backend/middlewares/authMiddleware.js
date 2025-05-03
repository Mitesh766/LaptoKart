import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";

const userAuth = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    res.status(401);
    throw new Error(" Please log in to continue");
  }
  const { _id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const userData = await User.findOne({ _id: _id }).select(
    "_id name email address isAdmin"
  );
  if (!userData) throw new Error(" Please log in to continue");

  req.user = userData;
  next();
});

export default userAuth;
