import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Body from './Components/Body';
import Login from './Components/Login';
import AllProducts from './Components/AllProducts';
import NotFound from './Components/NotFound';
import CreateProduct from './Components/Admin/createProduct';
import ProductPage from './Components/ProductPage';

import AdminRoute from './Components/Admin/AdminRoute';
import Wishlist from './Components/User/Wishlist';
import ProtectedRoute from './Components/User/ProtectedRoutes';
import Cart from './Components/User/Cart';




const App = () => {

  return (
    <>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <Routes>
            <Route path='/' element={<Body />}>
              <Route path="" element={<AllProducts />} />
              <Route path="login" element={<Login />} />

              <Route path="product/:id" element={<ProductPage />} />

              <Route element={<ProtectedRoute />}>
                <Route path="wishlist" element={<Wishlist />} />
                <Route path="cart" element={<Cart />} />
                
              </Route>
              <Route path="admin" element={<AdminRoute />}>
                <Route path="create-product" element={<CreateProduct />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>

    </>
  );
};

export default App;
