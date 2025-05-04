import User from "../models/userSchema.js";

export const getCartData = async (userId) => {
  const user = await User.findById(userId).populate("cart.productId");

  
  const transformedCart = user.cart.map((item) => {
    const price = item.productId?.price || 0;
    const quantity = item.quantity;
    return {
      ...item.toObject(),
      pricePerItem: price,
      totalItemPrice: quantity * price,
    };
  });

  const totalCartValue = transformedCart.reduce(
    (acc, item) => acc + item.totalItemPrice,
    0
  );

  return {
    cart: transformedCart,
    totalCartValue,
  };
};
