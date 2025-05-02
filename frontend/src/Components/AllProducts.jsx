import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import axios from 'axios';
import { PRODUCTS_URL } from '../utils/constants';
import useUserSummary from '../hooks/useUserData';

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const resp = await axios.get(PRODUCTS_URL, { withCredentials: true });
      setProducts(resp.data.data); 
    } catch (err) {
      console.error('Failed to fetch products:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.length === 0 ? (
        <p className="text-center text-gray-600 col-span-full">No products available</p>
      ) : (
        products.map((product) => (
          <ProductCard key={product._id} product={{
            ...product,
            image: Array.isArray(product.image) ? product.image[0] : product.image,
            description: Array.isArray(product.description) ? product.description : JSON.parse(product.description),
          }} />
        ))
      )}
    </div>
  );
};

export default AllProducts;
