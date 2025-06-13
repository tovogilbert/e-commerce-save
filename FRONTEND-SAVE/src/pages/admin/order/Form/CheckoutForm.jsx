import React from "react";
import { useCart } from "../../../../contexts/CartContext";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm() {
  const { checkoutData } = useCart();
  const navigate = useNavigate();

  if (!checkoutData) {
    return <div>Loading checkout data...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10 text-sm text-gray-800">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between space-x-4">
            <button className="flex-1 bg-purple-600 text-white py-2 rounded">Shop Pay</button>
            <button className="flex-1 bg-yellow-400 text-black py-2 rounded">PayPal</button>
          </div>
          <div className="text-center text-gray-400">OU</div>
          <div className="space-y-2">
            <h2 className="font-semibold">Contact</h2>
            <input
              type="text"
              placeholder="E-mail ou numéro de portable"
              className="w-full p-2 border border-red-500 rounded"
            />
            <p className="text-xs text-red-600">Entrez un numéro de téléphone valide</p>
            <a href="#" className="text-sm text-blue-600 hover:underline">Ouvrir une session</a>
          </div>
          <div className="space-y-2">
            <h2 className="font-semibold">Livraison</h2>
            <select className="w-full p-2 border rounded">
              <option>France</option>
            </select>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Prénom (optionnel)" className="p-2 border rounded" />
              <input type="text" placeholder="Nom" className="p-2 border rounded" />
            </div>
            <input type="text" placeholder="Adresse" className="w-full p-2 border rounded" />
            <input
              type="text"
              placeholder="Appartement, suite, etc. (optionnel)"
              className="w-full p-2 border rounded"
            />
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Code postal" className="p-2 border rounded" />
              <input type="text" placeholder="Ville" className="p-2 border rounded" />
            </div>
            <input type="text" placeholder="Téléphone" className="w-full p-2 border rounded" />
          </div>
          <div className="bg-gray-100 p-4 rounded text-sm">
            <p>Saisissez votre adresse d’expédition pour voir les modes d’expédition disponibles.</p>
          </div>
          <div className="space-y-4">
            <h2 className="font-semibold">Paiement</h2>
            <p className="text-xs text-gray-500">Toutes les transactions sont sécurisées et chiffrées.</p>

            <div className="border p-4 rounded space-y-3">
              <div className="flex items-center space-x-2">
                <input type="radio" checked className="accent-blue-600" />
                <span className="text-sm font-medium">Carte de crédit</span>
                <div className="ml-auto flex space-x-1">
                  <img src="https://img.icons8.com/color/24/visa.png" alt="Visa" />
                  <img src="https://img.icons8.com/color/24/mastercard-logo.png" alt="MasterCard" />
                  <img src="https://img.icons8.com/color/24/amex.png" alt="Amex" />
                </div>
              </div>
              <input type="text" placeholder="Numéro de carte" className="w-full p-2 border rounded" />
              <div className="grid grid-cols-2 gap-3">
                <input type="text" placeholder="Date d’expiration (MM/AA)" className="p-2 border rounded" />
                <input type="text" placeholder="Code de sécurité" className="p-2 border rounded" />
              </div>
              <input type="text" placeholder="Nom sur la carte" className="w-full p-2 border rounded" />
              <div className="flex items-center space-x-2">
                <input type="checkbox" className="accent-blue-600" />
                <label className="text-sm">Utiliser l'adresse d’expédition comme adresse de facturation</label>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input type="radio" className="accent-blue-600" />
              <span>PayPal</span>
              <img src="https://img.icons8.com/color/24/paypal.png" alt="PayPal" />
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" className="accent-blue-600" />
              <label>Enregistrer mes informations pour un paiement plus rapide avec un compte Shop</label>
            </div>
          </div>
          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Vérifier la commande
          </button>
        </div>
        <div className="bg-white p-6 rounded shadow-md space-y-4">
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
                    <p className="text-xs text-gray-500">Quantité: {item.quantity}</p>
                  </div>
                </div>
                <span>€{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="code de réduction"
              className="flex-1 p-2 border rounded"
            />
            <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
              Valider
            </button>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Sous-total · {checkoutData.itemCount} articles</span>
              <span>€{checkoutData.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Expédition</span>
              <span>€{checkoutData.shipping.toFixed(2)}</span>
            </div>
            {checkoutData.discount < 0 && (
              <div className="flex justify-between">
                <span>Réduction</span>
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