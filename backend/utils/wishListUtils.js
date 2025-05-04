import User from "../models/userSchema.js";
export const getWishlistData = async (userId) => {
  const user = await User.findById(userId).populate("wishlist.productId");
  return {
    wishlist: user.wishlist,
  };
};
