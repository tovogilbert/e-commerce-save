import { useState, useEffect } from 'react';
import PaymentService from '../../../services/PaymentService';

export const usePayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: null,
    dateFrom: null,
    dateTo: null
  });

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const params = {};
      
      if (filters.status) params.status = filters.status;
      if (filters.dateFrom) params.dateFrom = filters.dateFrom;
      if (filters.dateTo) params.dateTo = filters.dateTo;
      
      const data = await PaymentService.getAll();
      setPayments(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Erreur lors du chargement des paiements');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [filters]);

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return {
    payments,
    loading,
    error,
    filters,
    updateFilters,
    refresh: fetchPayments
  };
};