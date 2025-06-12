import React from "react";

export default function CheckoutForm() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulaire */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
          {/* Contact */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Contact</h2>
            <input
              type="text"
              placeholder="E-mail ou numéro de portable"
              className="w-full p-2 border border-red-500 rounded"
            />
            <p className="text-sm text-red-600 mt-1">
              Entrez un numéro de téléphone valide
            </p>
          </div>

          {/* Livraison */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Livraison</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Prénom"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Nom"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Adresse"
                className="w-full p-2 border rounded md:col-span-2"
              />
              <input
                type="text"
                placeholder="Appartement, suite (optionnel)"
                className="w-full p-2 border rounded md:col-span-2"
              />
              <input
                type="text"
                placeholder="Code postal"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Ville"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Téléphone"
                className="w-full p-2 border rounded md:col-span-2"
              />
            </div>
          </div>

          {/* Paiement */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Paiement</h2>
            <div className="border p-4 rounded space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Numéro de carte"
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Date d'expiration (MM/AA)"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Code de sécurité"
                  className="w-full p-2 border rounded"
                />
              </div>
              <input
                type="text"
                placeholder="Nom sur la carte"
                className="w-full p-2 border rounded"
              />
              <div className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <label>Utiliser l'adresse de livraison comme adresse de facturation</label>
              </div>
            </div>
          </div>

          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Vérifier la commande
          </button>
        </div>

        {/* Résumé commande */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Résumé</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Sneakers Steve McQueen (Orange)</span>
              <span>189,00 €</span>
            </div>
            <div className="flex justify-between">
              <span>Sneakers Steve McQueen (Vert)</span>
              <span>189,00 €</span>
            </div>
            <hr />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>378,00 €</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
