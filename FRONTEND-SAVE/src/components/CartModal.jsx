import React from 'react';
import { useCart } from '../contexts/CartContext';
import { FiX, FiPlus, FiMinus } from 'react-icons/fi';

const CartModal = () => {
  const {
    cartItems,
    isCartOpen,
    toggleCart,
    removeFromCart,
    updateQuantity,
    cartTotal
  } = useCart();

  if (!isCartOpen) return null;

  // Calcul des totaux
  const shippingCost = 20;
  const taxRate = 0.1;
  const tax = cartTotal * taxRate;
  const discount = cartTotal > 100 ? 10 : 0;
  const total = cartTotal + shippingCost + tax - discount;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Overlay */}
        <div className="fixed inset-0 transition-opacity" onClick={toggleCart}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        {/* Modal content */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-start">
              <h2 className="text-2xl font-bold text-gray-900">Your Bag</h2>
              <button onClick={toggleCart} className="text-gray-500 hover:text-gray-700">
                <FiX size={24} />
              </button>
            </div>

            <div className="mt-6 space-y-6">
              {cartItems.length === 0 ? (
                <p className="text-center text-gray-500 py-8">Your cart is empty</p>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="border-b border-gray-200 pb-4">
                    <div className="flex justify-between">
                      <h3 className="font-bold">{item.brand || 'No Brand'}</h3>
                      <span className="font-bold">${item.price.toFixed(2)}</span>
                    </div>
                    <p className="text-gray-600 mt-1">{item.name}</p>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <FiMinus size={16} />
                        </button>
                        <span className="font-bold">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <FiPlus size={16} />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="mt-8 border-t border-gray-200 pt-4">
                <h3 className="text-lg font-bold mb-4">Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping and delivery</span>
                    <span>${shippingCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t border-gray-200">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <button className="w-full mt-6 bg-black text-white py-3 px-4 rounded-lg font-bold hover:bg-gray-800 transition-colors">
                  Checkout →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;