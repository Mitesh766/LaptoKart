import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`} className="block">
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5 w-full max-w-sm mx-auto border border-gray-200">
        
       
        <div className="w-full h-52 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center mb-4">
          {product.image ? (
            <img
              src={Array.isArray(product.image) ? product.image[0] : product.image}
              alt={product.name}
              className="object-contain h-full w-full"
            />
          ) : (
            <span className="text-gray-400">No Image</span>
          )}
        </div>

       
        <h2 className="text-xl font-semibold text-gray-800 mb-1">{product.name}</h2>
        <p className="text-sm text-gray-500 mb-2">{product.brand}</p>

        
        <p className="text-lg font-bold text-green-600 mb-2">₹{product.price.toLocaleString("en-IN")}</p>

        
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="text-xs bg-blue-100 text-blue-800 font-medium px-2.5 py-0.5 rounded-full">
            {product.category}
          </span>
          <span className="text-xs bg-purple-100 text-purple-800 font-medium px-2.5 py-0.5 rounded-full">
            Stock: {product.countInStock}
          </span>
        </div>

      
        <ul className="text-sm text-gray-600 space-y-1">
          <li><strong>Processor:</strong> {product.processor}</li>
          <li><strong>RAM:</strong> {product.ram}</li>
          <li><strong>Storage:</strong> {product.storage}</li>
          <li><strong>Screen:</strong> {product.screenSize}</li>
          <li><strong>Graphics:</strong> {product.graphicsCard}</li>
          <li><strong>OS:</strong> {product.operatingSystem}</li>
        </ul>
      </div>
    </Link>
  );
};

export default ProductCard;
