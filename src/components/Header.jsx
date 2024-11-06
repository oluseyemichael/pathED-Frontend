import React from 'react';

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">pathED</h1>
        <nav>
          <a href="#features" className="text-gray-600 mx-2">Features</a>
          <a href="#courses" className="text-gray-600 mx-2">Courses</a>
          <a href="#signup" className="text-blue-500 mx-2">Sign Up</a>
          <a href="#login" className="text-gray-600 mx-2">Login</a>
        </nav>
      </div>
    </header>
  );
}
