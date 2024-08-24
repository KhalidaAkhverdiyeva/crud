import Image from 'next/image';
import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-4 px-[50px] flex justify-between items-center">
   
      <div className="flex items-center gap-[50px]">
      <img src="./trimmed.png" alt="/"  className="h-[50px]"/>
        <ul className="flex space-x-6">
          <li><a href="#blog" className="text-gray-700 font-bold hover:text-gray-900">Blog</a></li>
          <li><a href="#products" className="text-gray-700 hover:text-gray-900">Products</a></li>
          <li><a href="#contact" className="text-gray-700 hover:text-gray-900">Contact</a></li>
          <li><a href="#about" className="text-gray-700 hover:text-gray-900">About</a></li>
        </ul>
      </div>

      <div className="flex items-center space-x-[30px]">
        <button className="bg-[#E3411A] text-white px-4 py-2 rounded-md hover:bg-orange-600 transition">
          Create Card
        </button>
        <Image
          src="/ava.webp"
          alt="Profile"
          width={100}
          height={100}
          className="w-[60px] h-[60px] rounded-full object-cover border shadow cursor-pointer"
        />
      </div>
    </nav>
  );
};

export default Navbar;