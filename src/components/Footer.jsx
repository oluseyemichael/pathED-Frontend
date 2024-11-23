import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[url('/src/assets/Path.ed.png')] bg-blue-700 bg-no-repeat text-white py-4 h-96">
      <div className="container mx-auto flex justify-between items-center">
        <p>&copy; {new Date().getFullYear()} pathED</p>
        <div className="flex space-x-4">
          <a href="/privacy-policy" className="hover:text-blue-500">
            Privacy Policy
          </a>
          <a href="/terms-of-service" className="hover:text-blue-500">
            Terms of Services
          </a>
          <a href="/cookie-policy" className="hover:text-blue-500">
            Cookie Policy
          </a>
        </div>
        <p className="text-right">Designed by Dev, 2020</p>
      </div>
      <div></div>
    </footer>
  );
}


