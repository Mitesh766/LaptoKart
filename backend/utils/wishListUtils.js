import User from "../models/userSchema.js";
export const getWishlistData = async (userId) => {
  const user = await User.findById(userId).populate("wishlist.productId");
  if (!user) {
    throw new Error("User not found");
  }
  return {
    wishlist: user.wishlist,
  };
};
