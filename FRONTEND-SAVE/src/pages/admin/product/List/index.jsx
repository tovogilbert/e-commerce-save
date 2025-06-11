import React, { useState } from 'react';
import Table from '../../../../components/Table';
import { useProducts } from './hook/useProducts';
import { Link } from 'react-router-dom';
import { FiEdit, FiTrash2, FiEye, FiMoreVertical } from 'react-icons/fi';
import TopBar from '../../../../components/TopBar';
import { FaPlus } from 'react-icons/fa';

const ProductListPage = () => {
  const { products, loading, error } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  // Filtrage des produits
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Configuration des colonnes
  const tableTitles = ['image', 'Name', 'Description', 'Price HT', 'Stock', 'Brand'];
  const tableKeys = ['image', 'name', 'description', 'priceExclTax', 'stockQty', 'brandId'];

  // Formatage des données pour le tableau
  const formattedProducts = filteredProducts.map(product => ({
  ...product,
  priceExclTax: `${product.priceExclTax.toFixed(2)} €`,
  brandId: product.brand?.name || `Marque #${product.brandId}`,
  image: (
    <img
      src={product.image}
      alt={product.name}
      className="w-16 h-16 object-cover rounded-md"
      onError={(e) => { e.target.src = "/placeholder.png"; }}
    />
  )
}));


  // Actions pour chaque ligne avec dropdown
  const columnAction = (row) => (
    <div className="relative">
      <button onClick={() => toggleDropdown(row.id)} className="p-2 rounded-md hover:bg-gray-100 focus:outline-none">
        <FiMoreVertical className="h-5 w-5 text-gray-600" />
      </button>
      {dropdownOpen === row.id && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
          <div className="py-1">
            <Link to={`/products/view/${row.id}`} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
              <FiEye className="mr-2 text-blue-600" />
              Voir détails
            </Link>
            <Link to={`/products/edit/${row.id}`} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
              <FiEdit className="mr-2 text-green-600" />
              Modifier
            </Link>
            <button onClick={() => { handleDelete(row.id); setDropdownOpen(null);}} className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
              <FiTrash2 className="mr-2 text-red-600" />
              Supprimer
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const handleDelete = (id) => {
    console.log('Supprimer le produit', id);
  };

  return (
    <div className="container mt-4 px-20 py-20 bg-white text-gray-600">
      <TopBar/>
      <div className="flex justify-between items-center mb-4 px-10 py-5">
        <h1 className='text-xl font-black'>List of all products</h1>
        <button to="/products/new" className="flex content-between items-center bg-blue-400 px-3 cursor-pointer py-1 shadow-lg rounded-md font-medium text-amber-50">
         <FaPlus className='mr-2 font-light'/> Add new
        </button>
      </div>      
      <Table  title={tableTitles} keys={tableKeys} rows={formattedProducts} onChangeSearch={(e) => setSearchTerm(e.target.value)} columnAction={columnAction} />
    </div>
  );
};

export default ProductListPage;