import { useState, useEffect } from 'react';
import productService from '../../../../../services/productService';

export const useProducts = (options = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [brandId, setBrandId] = useState(options.brandId || null);
  const [searchQuery, setSearchQuery] = useState(options.searchQuery || '');

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      let data;
      
      if (brandId) {
        data = await productService.getByBrand(brandId);
      } else if (searchQuery) {
        data = await productService.search(searchQuery);
      } else {
        data = await productService.getAll();
      }
      
      setProducts(data);
    } catch (err) {
      setError(err.message || 'Erreur lors du chargement des produits');
      console.error('Erreur useProducts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [brandId, searchQuery]);

  const refetch = () => {
    fetchProducts();
  };

  return { 
    products, 
    loading, 
    error, 
    refetch,
    setBrandId,
    setSearchQuery
  };
};