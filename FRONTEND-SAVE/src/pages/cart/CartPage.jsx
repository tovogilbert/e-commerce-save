import React from "react";
import { useCart } from "../../contexts/CartContext";
import { motion } from "framer-motion";
import TopBar from "../../components/TopBar";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, itemCount, proceedToCheckout } = useCart();
  const navigate = useNavigate();
  const shipping = cartItems.length > 0 ? 20.0 : 0;
  const tax = cartTotal * 0.2;
  const discount = cartTotal > 100 ? -10.0 : 0;
  const total = (cartTotal + shipping + tax + discount);

  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <div className="max-w-7xl mx-auto px-4 py-12 sm:py-24">
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-600">Your bag is empty</h3>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            <div className="flex-1 order-2 lg:order-1">
              <div className="mb-8">
                  <h1 className="text-3xl md:text-4xl mt-10 font-bold text-gray-900">Your Bag</h1>
              </div>
              <div className="space-y-4 sm:space-y-6">
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-row sm:flex-row gap-x-4 pr-6 pt-4 pb-5 border-b border-gray-200">
                    <div className="w-full h-32 sm:w-40 sm:h-30 bg-gray-100 rounded-lg overflow-hidden">
                      <img  src={item.image} alt={item.name} className="w-full h-full object-cover p-4" />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between">
                        <div className="space-y-1 sm:space-y-2">
                          <h3 className="font-medium text-gray-900 text-base sm:text-lg">{item.brand?.name || item.brand}</h3>
                          <p className="text-gray-500 text-sm sm:text-base">{item.name}</p>
                        </div>
                        <p className="font-medium text-gray-900 text-base sm:text-lg">€{(item.price * item.quantity)}</p>
                      </div>
                      <div className="mt-auto flex items-center gap-3 sm:gap-4">
                        <div className="flex items-center border border-gray-200 rounded-lg">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100">
                            -
                          </button>
                          <span className="px-3 py-1 text-gray-900">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100">
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-sm text-gray-600 hover:text-red-700 underline">
                          Remove
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="w-full lg:w-120 order-1 lg:order-2 mt-10 lg:ml-20 ">
              <div className="bg-white p-6 sm:p-6 lg:p-8 font-bold rounded-xl shadow-2xl lg:sticky lg:top-24">
                <h2 className="text-2xl sm:text-xl md:text-4xl  text-gray-900 mb-4 sm:mb-6 lg:mb-8">
                  Summary
                </h2>
                <div className="space-y-3 sm:space-y-4 text-gray-700  font-bold pr-5 lg:space-y-6 text-md md:text-lg">
                  <div className="flex justify-between  ">
                    <span>Subtotal</span>
                    <span>€{cartTotal}.00</span>
                  </div>
                  <div className="flex justify-between ">
                    <span>Shipping</span>
                    <span>€{shipping}.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>€{tax}</span>
                  </div>
                  {discount < 0 && (
                    <div className="flex justify-between">
                      <span>Discount</span>
                      <span className="text-red-400">€{Math.abs(discount)}.00</span>
                    </div>
                  )}
                  <div className="border-t border-gray-200 my-3 sm:my-4 lg:my-6"></div>
                  <div className="flex justify-between font-semibold text-base lg:text-xl">
                    <span className="text-gray-900">Total</span>
                    <span className="text-gray-900">€{total}</span>
                  </div>
                </div>

                 <motion.button onClick={() => { proceedToCheckout(); navigate("/order"); }}  whileTap={{ scale: 0.98 }}  className="w-full mt-4 sm:mt-6 lg:mt-8 py-2 sm:py-3 flex items-center justify-center lg:py-4 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm sm:text-base lg:text-lg">

                  Checkout <FaArrowRight className="ml-5" />
                </motion.button>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;