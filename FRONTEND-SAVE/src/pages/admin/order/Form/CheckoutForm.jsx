import React from "react";
import { useCart } from "../../../../contexts/CartContext";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm() {
  const { checkoutData } = useCart();
  const navigate = useNavigate();

  if (!checkoutData) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10 text-sm text-gray-800">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Express Checkout */}
          <div className="flex items-center justify-between space-x-4">
            <button className="flex-1 bg-purple-600 text-white py-2 rounded">Shop Pay</button>
            <button className="flex-1 bg-yellow-400 text-black py-2 rounded">PayPal</button>
          </div>
          <div className="text-center text-gray-400">OR</div>

          {/* Contact Information */}
          <div className="space-y-2">
            <h2 className="font-semibold">Contact</h2>
            <input
              type="text"
              placeholder="Email or phone number"
              className="w-full p-2 border border-red-500 rounded"
            />
            <p className="text-xs text-red-600">Please enter a valid phone number</p>
            <a href="#" className="text-sm text-blue-600 hover:underline">Sign in</a>
          </div>

          {/* Shipping Information */}
          <div className="space-y-2">
            <h2 className="font-semibold">Shipping</h2>
            <select className="w-full p-2 border rounded">
              <option>France</option>
            </select>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="First name (optional)" className="p-2 border rounded" />
              <input type="text" placeholder="Last name" className="p-2 border rounded" />
            </div>
            <input type="text" placeholder="Address" className="w-full p-2 border rounded" />
            <input
              type="text"
              placeholder="Apartment, suite, etc. (optional)"
              className="w-full p-2 border rounded"
            />
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Postal code" className="p-2 border rounded" />
              <input type="text" placeholder="City" className="p-2 border rounded" />
            </div>
            <input type="text" placeholder="Phone" className="w-full p-2 border rounded" />
          </div>

          {/* Shipping Method */}
          <div className="bg-gray-100 p-4 rounded text-sm">
            <p>Enter your shipping address to view available shipping options.</p>
          </div>

          {/* Payment Information */}
          <div className="space-y-4">
            <h2 className="font-semibold">Payment</h2>
            <p className="text-xs text-gray-500">All transactions are secure and encrypted.</p>

            <div className="border p-4 rounded space-y-3">
              <div className="flex items-center space-x-2">
                <input type="radio" checked className="accent-blue-600" />
                <span className="text-sm font-medium">Credit card</span>
                <div className="ml-auto flex space-x-1">
                  <img src="https://img.icons8.com/color/24/visa.png" alt="Visa" />
                  <img src="https://img.icons8.com/color/24/mastercard-logo.png" alt="MasterCard" />
                  <img src="https://img.icons8.com/color/24/amex.png" alt="Amex" />
                </div>
              </div>
              <input type="text" placeholder="Card number" className="w-full p-2 border rounded" />
              <div className="grid grid-cols-2 gap-3">
                <input type="text" placeholder="Expiration (MM/YY)" className="p-2 border rounded" />
                <input type="text" placeholder="Security code" className="p-2 border rounded" />
              </div>
              <input type="text" placeholder="Name on card" className="w-full p-2 border rounded" />
              <div className="flex items-center space-x-2">
                <input type="checkbox" className="accent-blue-600" />
                <label className="text-sm">Use shipping address as billing address</label>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input type="radio" className="accent-blue-600" />
              <span>PayPal</span>
              <img src="https://img.icons8.com/color/24/paypal.png" alt="PayPal" />
            </div>

            {/* Save Information */}
            <div className="flex items-center space-x-2">
              <input type="checkbox" className="accent-blue-600" />
              <label>Save my information for faster checkout with a Shop account</label>
            </div>
          </div>

          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Review order
          </button>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded shadow-md space-y-4">
          {/* Products */}
          <div className="space-y-4">
            {checkoutData.items.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-12 h-12 rounded object-contain" 
                  />
                  <div>
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <span>€{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Discount code"
              className="flex-1 p-2 border rounded"
            />
            <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
              Apply
            </button>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal · {checkoutData.itemCount} items</span>
              <span>€{checkoutData.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>€{checkoutData.shipping.toFixed(2)}</span>
            </div>
            {checkoutData.discount < 0 && (
              <div className="flex justify-between">
                <span>Discount</span>
                <span className="text-green-600">
                  -€{Math.abs(checkoutData.discount).toFixed(2)}
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Taxes</span>
              <span>€{checkoutData.tax.toFixed(2)}</span>
            </div>
            <hr />
            <div className="flex justify-between font-semibold text-base">
              <span>Total</span>
              <span>€{checkoutData.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}