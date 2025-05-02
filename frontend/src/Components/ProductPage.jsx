import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CART_URL, PRODUCTS_URL } from '../utils/constants';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [inCart, setInCart] = useState(false);

  const fetchProduct = async () => {
    const res = await axios.get(`${PRODUCTS_URL}/${id}`);
    setProduct(res.data.data);
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const addToCart = async () => {
    await axios.post(`${CART_URL}/${id}`, { productId: id }, { withCredentials: true });
    alert('Added to cart');
  };

  const addToWishlist = async () => {
    await axios.post('/api/users/wishlist', { productId: id }, { withCredentials: true });
    alert('Added to wishlist');
  };

  const removeFromCart = async () => {

  }

  if (!product) return <p>Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-10">

      <div className="w-full h-120 bg-gray-200 rounded-xl overflow-hidden flex items-center justify-center mt-4">
        <img
          src={Array.isArray(product.image) ? product.image[0] : product.image}
          alt={product.name}
          className="object-contain h-full w-full"
        />
      </div>


      <div className="space-y-6">
        <h1 className="text-4xl font-bold text-white">{product.name}</h1>
        <p className="text-slate-300">{product.category}</p>
        <p className="text-xl font-semibold text-emerald-400">
          ₹{product.price.toLocaleString("en-IN")}
        </p>


        <p className="text-slate-400"><strong>Processor:</strong> {product.processor}</p>
        <p className="text-slate-400"><strong>RAM:</strong> {product.ram}</p>
        <p className="text-slate-400"><strong>Storage:</strong> {product.storage}</p>
        <p className="text-slate-400"><strong>Graphics:</strong> {product.graphicsCard}</p>
        <p className="text-slate-400"><strong>OS:</strong> {product.operatingSystem}</p>
        <p className="text-slate-400"><strong>Stock:</strong> {product.countInStock > 0 ? product.countInStock : "Out of stock"}</p>


        <div className="flex gap-6 mt-6">
          <button
            onClick={!inCart ? addToCart : removeFromCart}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
          >
            {!inCart ? "Add to Cart" : "Remove from Cart"}
          </button>
          <button
            onClick={addToWishlist}
            className="bg-pink-500 text-white px-6 py-3 rounded-xl hover:bg-pink-600"
          >
            Add to Wishlist
          </button>
        </div>
      </div>


      {product.description && product.description.length > 0 && (
        <div className="mt-12 bg-slate-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">Product Highlights</h2>
          <ul className="list-disc list-inside space-y-2 text-slate-200 text-base">
            {product.description.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
