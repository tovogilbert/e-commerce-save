import { useReducer } from 'react';
import { initialProduct } from '../../../../../utils/productUtils';
import productService from '../../../../../services/productService';

const initialState = {
  ...initialProduct,
  loading: false,
  error: null,
  success: false
};

function reducer(state, action) {
  switch (action.type) {
    case 'FIELD_CHANGE':
      return { ...state, [action.field]: action.value };
    case 'BRAND_CHANGE':
      return { ...state, brand: { ...state.brand, ...action.value } };
    case 'ADD_FEATURE':
      return { ...state, features: [...state.features, action.feature] };
    case 'REMOVE_FEATURE':
      return { ...state, features: state.features.filter(f => f.id !== action.featureId) };
    case 'RESET':
      return initialState;
    case 'SUBMIT_START':
      return { ...state, loading: true, error: null, success: false };
    case 'SUBMIT_SUCCESS':
      return { ...initialState, success: true };
    case 'SUBMIT_ERROR':
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}

export const useProductReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'FIELD_CHANGE', field: name, value });
  };

  const handleBrandChange = (brand) => {
    dispatch({ type: 'BRAND_CHANGE', value: brand });
  };

  const handleAddFeature = (feature) => {
    dispatch({ type: 'ADD_FEATURE', feature });
  };

  const handleRemoveFeature = (featureId) => {
    dispatch({ type: 'REMOVE_FEATURE', featureId });
  };

  const resetForm = () => {
    dispatch({ type: 'RESET' });
  };

  const submitForm = async (productData) => {
    dispatch({ type: 'SUBMIT_START' });
    try {
      await productService.create(productData);
      dispatch({ type: 'SUBMIT_SUCCESS' });
    } catch (error) {
      dispatch({ 
        type: 'SUBMIT_ERROR', 
        error: error.response?.data?.message || 'Error creating product' 
      });
    }
  };

  return {
    state,
    handleChange,
    handleBrandChange,
    handleAddFeature,
    handleRemoveFeature,
    resetForm,
    submitForm
  };
};