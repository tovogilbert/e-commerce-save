import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import logo from '../assets/images/logo/logo.svg';

const CartButton = ({ itemCount }) => {
  return (
    <button className="relative flex items-center justify-between px-3 py-2 border border-gray-900 rounded-lg" aria-label="View cart">
      <FaShoppingCart className="mr-2" size={16} /> 
       <span className="ml-2 font-bold">View cart</span>
      <span className="ml-2 flex items-center justify-center bg-orange-600 text-amber-50 rounded-full text-sm w-5 h-5">
        {itemCount}
      </span>
    </button>
  );
};

const TopBar = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-5 py-3 bg-white border-b border-gray-200 text-sm text-zinc-800 xl:px-50">
      <div className="flex items-center">
        <img className="mr-1 rounded-full" src={logo} alt="Logo" />
      </div>
      <CartButton itemCount={2} />
    </header>
  );
};

export default TopBar;
