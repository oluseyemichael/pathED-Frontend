import React from 'react';

export default function Footer() {
  return (
    <footer className=" bg-[#000C30]  text-white py-10 tracking-tight">
      <div className="flex flex-col items-center text-xs">
        <div className="flex space-x-3 mt-4 md:mt-0">
        <p>&copy; {new Date().getFullYear()} pathED</p>
          <a href="/" className="hover:text-blue-500">
            Privacy Policy
          </a>
          <a href="/" className="hover:text-blue-500">
            Terms of Services
          </a>
          <a href="/" className="hover:text-blue-500">
            Cookie Policy
          </a>
        </div>
        <p className="mt-4 md:mt-0 text-center md:text-right">Designed by Dee<span className='text-2xl text-orange-500'>.</span>sign</p>
        <div className="">
        <img className="w-full -mb-10 " src="/assets/Path.ed.png" alt="pathED logo" />
        </div>
      </div>
    </footer>
  );
}