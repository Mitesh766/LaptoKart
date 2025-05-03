
import User from "../models/userSchema.js"
export const getCartData = async (userId) => {
    const user = await User.findById(userId).populate("cart.productId");
    if (!user) {
      throw new Error("User not found");
    }
  
    user.cart.forEach((item) => {
      if (item.productId) {
        item.pricePerItem = item.productId.price;
        item.totalItemPrice = item.quantity * item.productId.price;
      }
    });
  
    const totalCartValue = user.cart.reduce(
      (acc, item) => acc + (item.totalItemPrice || 0),
      0
    );
  
    return {
      cart: user.cart,
      totalCartValue,
    };
  };
  