// src/pages/products/list/index.js
import React, { useState, useMemo } from 'react';
import Table from '../../../../components/Table';
import { useProducts } from './hook/useProducts';
import { Link, useNavigate } from 'react-router-dom';
import { FiEdit, FiTrash2, FiEye } from 'react-icons/fi';
import TopBar from '../../../../components/TopBar';
import { FaPlus } from 'react-icons/fa';

const ProductListPage = () => {
  const { products, loading, error } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;
    return products.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  const tableConfig = useMemo(() => ({
    titles: ['Image', 'Name', 'Description', 'Price HT', 'Stock', 'Brand'],
    keys: ['image', 'name', 'description', 'priceExclTax', 'stockQty', 'brand']
  }), []);

  const formattedProducts = useMemo(() => 
    filteredProducts.map(product => ({
      ...product,
      priceExclTax: `${product.priceExclTax.toFixed(2)} €`,
      brand: product.brand?.name || `Brand #${product.brandId}`,
      image: (
        <img
          src={product.image}
          alt={product.name}
          className="w-16 h-16 object-cover rounded-md"
          onError={(e) => { e.target.src = "/placeholder.png"; }}
        />
      )
    }))
  , [filteredProducts]);

  const handleRowAction = (row) => {
    return (
      <div className="flex space-x-2">
        <Link 
          to={`/products/view/${row.id}`}
          className="text-blue-600 hover:text-blue-800 p-1"
          title="View"
        >
          <FiEye className="h-5 w-5" />
        </Link>
        <Link 
          to={`/products/edit/${row.id}`}
          className="text-green-600 hover:text-green-800 p-1"
          title="Edit"
        >
          <FiEdit className="h-5 w-5" />
        </Link>
        <button 
          onClick={() => handleDelete(row.id)}
          className="text-red-600 hover:text-red-800 p-1"
          title="Delete"
        >
          <FiTrash2 className="h-5 w-5" />
        </button>
      </div>
    );
  };

  const handleDelete = (id) => {
    // Delete logic here
    console.log('Delete product', id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Product List</h1>
          <button 
            onClick={() => navigate('/products/create')}
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <FaPlus className="mr-2" />
            Add New Product
          </button>
        </div>
        
        <Table
          titles={tableConfig.titles}
          keys={tableConfig.keys}
          rows={formattedProducts}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          onRowAction={handleRowAction}
        />
      </div>
    </div>
  );
};

export default ProductListPage;