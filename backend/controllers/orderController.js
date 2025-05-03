import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/userSchema.js";

export const getOrders = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
    .populate("orders.productId")
    .select("orders");
  res.status(200).json({
    message: "Orders fetched successfully",
    data: user.orders,
  });
});
