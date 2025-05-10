import React from 'react';
import useCartItems from '../../hooks/useCartItems';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, handleCartQty } from '../../services/userActions.js';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  useCartItems();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartData = useSelector((store) => store.cart.cartItems);
  const cartTotal = useSelector((store) => store.cart.totalCartValue);

  return (
    <div className="p-4 md:p-8 bg-gray-900 text-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-center">🛒 Your Shopping Cart</h2>

      {cartData.length === 0 ? (
        <p className="text-center text-gray-400">Your cart is empty.</p>
      ) : (
        <div className="space-y-6 max-w-6xl mx-auto px-2 sm:px-4">
          {cartData.map((item) => {
            const product = item.productId;
            return (
              <div
                key={product._id}
                className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition"
              >
                <div className="w-full sm:w-32 h-48 sm:h-32 flex-shrink-0">
                  <img
                    src={product.image[0]}
                    alt={product.name}
                    className="w-full h-full object-fill rounded-lg border border-gray-700"
                  />
                </div>
                <div className="flex-1 w-full">
                  <h3 className="text-lg sm:text-xl font-semibold text-white">{product.name}</h3>
                  <p className="text-sm text-gray-400">{product.brand} • {product.ram} • {product.storage}</p>
                  <p className="mt-1 text-gray-300 font-medium">₹ {item.pricePerItem.toLocaleString("en-In")} × {item.quantity}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600"
                      onClick={async () => handleCartQty(product._id, item.quantity - 1, dispatch, navigate)}
                    >-</button>
                    <span className="font-semibold px-2 text-white">{item.quantity}</span>
                    <button
                      className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600"
                      onClick={async () => handleCartQty(product._id, item.quantity + 1, dispatch, navigate)}
                    >+</button>
                    <button
                      className="ml-auto sm:ml-4 mt-2 sm:mt-0 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-500"
                      onClick={async () => await removeFromCart(product._id, dispatch, navigate)}
                    >
                      🗑 Remove
                    </button>
                  </div>
                </div>
                <div className="text-right font-semibold text-lg text-green-400 w-full sm:w-auto">
                  ₹ {item.totalItemPrice.toLocaleString("en-In")}
                </div>
              </div>
            );
          })}

          <div className="text-right text-2xl font-bold pt-6 border-t border-gray-700 mt-4">
            Cart Total: ₹ {cartTotal.toLocaleString("en-In")}
          </div>

          <div className="flex justify-end">
            <button className="text-white bg-green-600 hover:bg-green-700 text-lg px-6 py-3 rounded-xl shadow w-full sm:w-auto">
              ✅ Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;