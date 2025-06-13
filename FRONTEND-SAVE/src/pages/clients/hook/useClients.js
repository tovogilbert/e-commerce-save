import { useState, useEffect } from 'react';
import ClientService from '../../../services/ClientService';

export const useClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clientType, setClientType] = useState('individual'); // 'individual' ou 'business'

  const fetchClients = async () => {
    try {
      setLoading(true);
      let data;
      
      if (clientType === 'individual') {
        data = await ClientService.getAll();
      } else {
        data = await ClientService.getAllBusiness();
      }
      
      setClients(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Erreur lors du chargement des clients');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, [clientType]);

  const switchClientType = (type) => {
    setClientType(type);
  };

  return {
    clients,
    loading,
    error,
    clientType,
    switchClientType,
    refresh: fetchClients
  };
};