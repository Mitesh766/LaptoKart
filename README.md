# LaptoKart - Laptop E-commerce Platform

Welcome to **LaptoKart**, an e-commerce platform built specifically for selling laptops of all brands and varieties. This repository contains the complete project with both backend and frontend implementations. The backend is  functional, while the frontend is currently in progress.

## Project Structure

```
└── mitesh766-laptokart/
    ├── package.json
    ├── backend/
    │   ├── app.js
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── controllers/
    │   │   ├── adminController.js
    │   │   ├── cartController.js
    │   │   ├── productController.js
    │   │   └── userController.js
    │   ├── middlewares/
    │   │   ├── adminMiddleware.js
    │   │   ├── authMiddleware.js
    │   │   └── multer.js
    │   ├── models/
    │   │   ├── orderSchema.js
    │   │   ├── productSchema.js
    │   │   └── userSchema.js
    │   ├── routes/
    │   │   ├── adminRoutes.js
    │   │   ├── cartRoutes.js
    │   │   ├── productRoutes.js
    │   │   └── userRoutes.js
    │   └── utils/
    │       ├── asyncHandler.js
    │       ├── cloudinary.js
    │       ├── db.js
    │       └── validate.js
    └── frontend/
        ├── README.md
        ├── eslint.config.js
        ├── index.html
        ├── package-lock.json
        ├── package.json
        ├── vite.config.js
        ├── public/
        └── src/
            ├── App.jsx
            ├── index.css
            ├── main.jsx
            ├── assets/
            └── Components/
                ├── Body.jsx
                ├── Footer.jsx
                ├── Login.jsx
                └── NavBar.jsx
```

## Technology Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Multer for file handling
- Cloudinary for image storage
- Mongoose Schema Validation

### Frontend
- React.js
- Vite as build tool
- CSS for styling

## Features

### Backend Features

* **User Authentication & Authorization**
   * JWT-based authentication
   * Role-based access (Admin/User)
* **Product Management**
   * Add, update, delete laptops (admin)
   * Store detailed specifications like processor, RAM, storage, OS, etc.
* **Cart Functionality**
   * Add to cart
   * Update quantity
   * Remove items
   * Get full cart with populated product details and total cart value
* **Wishlist**
   * Add/remove items from wishlist
* **Order Management** *(to be added soon)*
* **Image Uploads**
   * Direct Cloudinary integration from backend
* **Modular Codebase**
   * Controllers, Routes, Middleware, and Models are well-structured and scalable.

## Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/mitesh766-laptokart.git
   cd mitesh766-laptokart
   ```

2. Install dependencies
   ```
   # Root dependencies
   npm install
   
   # Backend dependencies
   cd backend
   npm install
   
   # Frontend dependencies
   cd ../frontend
   npm install
   ```

3. Configure environment variables
   
   Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. Start the development servers
   
   In the root directory:
   ```
   # Run both frontend and backend concurrently
   npm run dev
   
   # Or separately
   # Backend
   cd backend
   npm run dev
   
   # Frontend
   cd frontend
   npm run dev
   ```

## API Endpoints

### User Routes
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Product Routes
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get a specific product
- `POST /api/products` - Add a new product (admin only)
- `PUT /api/products/:id` - Update a product (admin only)
- `DELETE /api/products/:id` - Delete a product (admin only)

### Cart Routes
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:itemId` - Update cart item
- `DELETE /api/cart/:itemId` - Remove item from cart

### Admin Routes
- `GET /api/admin/dashboard` - Admin dashboard data
- `GET /api/admin/orders` - Get all orders
- `PUT /api/admin/orders/:id` - Update order status




## Contact

Email - miteshagrawal972@gmail.com
Project Link: [https://github.com/Mitesh766/laptokart](https://github.com/Mitesh766/laptokart)