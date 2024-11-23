import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RiMenuFold2Fill } from "react-icons/ri";


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const NavLink = ({ href, children }) => (
    <a
      href={href}
      className="text-gray-600 hover:text-gray-900 hover:font-semibold relative group"
    >
      {children}
      <span className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
    </a>
  );

  return (
    <>
      <header className="bg-white shadow-sm h-[116px] flex items-center fixed w-full top-0 z-50">
        <div className="container mx-auto px-4">
          {/* Desktop Navigation */}
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <img src="src/assets/logo.svg" alt="pathED" className="h-8" />
            </div>

            {/* Desktop Menu - Hidden on mobile */}
            <nav className="hidden md:flex items-center space-x-8">
              <NavLink href="/about">About</NavLink>
              <NavLink href="/feature">Feature</NavLink>
              <NavLink href="/how-it-works">How it works</NavLink>
              <NavLink href="/courses">Courses Offered</NavLink>
            </nav>

            {/* Desktop Auth Buttons - Hidden on mobile */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/login"
                className="px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                Start Learning →
              </Link>
            </div>

            {/* Mobile Menu Button - Visible only on mobile */}
            <button
              className="md:hidden p-3 rounded-lg bg-gray-50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <RiMenuFold2Fill className="h-6 w-6 text-gray-900" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 md:hidden">
          <div className="pt-[116px] px-4">
            <nav className="flex flex-col space-y-6 py-8">
              <NavLink href="/about">About</NavLink>
              <NavLink href="/feature">Feature</NavLink>
              <NavLink href="/how-it-works">How it works</NavLink>
              <NavLink href="/courses">Courses Offered</NavLink>
              <div className="pt-6 flex flex-col space-y-4">
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-600 hover:text-gray-900 text-center"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-center"
                >
                  Start Learning →
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-[116px]"></div>
    </>
  );
};

export default Header;