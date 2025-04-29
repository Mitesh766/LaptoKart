import React from 'react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-5xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-xl mb-2">Oops! The page you're looking for doesn't exist.</p>
      <a href="/" className="text-blue-600 hover:underline mt-4">← Go back to Home</a>
    </div>
  );
};

export default NotFound;
