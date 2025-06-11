import React from 'react';
import { Outlet } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import CartModal from './components/CartModal';


const Index = () => {
  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen">
        <main className="bg-white">
          <div>
            <Outlet/>
          </div>
        </main>
        <CartModal />
      </div>
    </CartProvider>
  );
};

export default Index;
