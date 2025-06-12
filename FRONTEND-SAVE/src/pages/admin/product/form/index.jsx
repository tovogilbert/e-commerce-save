import React, { useState, useEffect } from 'react';
import { useProductReducer } from './hook/useCreateProduct';
import brandService from '../../../../services/BrandService';
import featureService from '../../../../services/FeatureService';
import { initialBrand, initialFeature } from '../../../../utils/productUtils';
import { useNavigate } from 'react-router-dom';
import TopBar from '../../../../components/TopBar';

const CreateProductForm = () => {
  const {
    state,
    handleChange,
    handleBrandChange,
    handleAddFeature,
    handleRemoveFeature,
    resetForm,
    submitForm
  } = useProductReducer();

  const [brands, setBrands] = useState([]);
  const [features, setFeatures] = useState([]);
  const [newBrand, setNewBrand] = useState(initialBrand);
  const [newFeature, setNewFeature] = useState(initialFeature);
  const [imagePreview, setImagePreview] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [brandsData, featuresData] = await Promise.all([
          brandService.getAll(),
          featureService.getAll()
        ]);
        setBrands(brandsData);
        setFeatures(featuresData);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    fetchData();
  }, []);

  const handleImageChange = (e) => {
    const value = e.target.value;
    handleChange(e);
    setImagePreview(value);
  };

  const handleCreateBrand = async () => {
    try {
      const createdBrand = await brandService.create(newBrand);
      setBrands([...brands, createdBrand]);
      handleBrandChange(createdBrand);
      setNewBrand(initialBrand);
    } catch (error) {
      console.error("Error creating brand:", error);
    }
  };

  const handleCreateFeature = async () => {
    try {
      const createdFeature = await featureService.create(newFeature);
      setFeatures([...features, createdFeature]);
      handleAddFeature(createdFeature);
      setNewFeature(initialFeature);
    } catch (error) {
      console.error("Error creating feature:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      name: state.name,
      description: state.description,
      priceExclTax: parseFloat(state.priceExclTax),
      brandId: state.brand.id,
      stockQty: parseInt(state.stockQty),
      image: state.image,
      featureIds: state.features.map(f => f.id)
    };
    await submitForm(productData);
    navigate('/products');
    resetForm();
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-50">
      <TopBar />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Create New Product</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4 z-100 text-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Product Name*</label>
              <input
                type="text"
                name="name"
                value={state.name}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description*</label>
              <textarea
                name="description"
                value={state.description}
                onChange={handleChange}
                rows={3}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Price (€)*</label>
                <input
                  type="number"
                  name="priceExclTax"
                  value={state.priceExclTax}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Stock*</label>
                <input
                  type="number"
                  name="stockQty"
                  value={state.stockQty}
                  onChange={handleChange}
                  min="0"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Brand*</label>
              <div className="flex space-x-2">
                <select
                  value={state.brand.id}
                  onChange={(e) => {
                    const selected = brands.find(b => b.id === parseInt(e.target.value));
                    if (selected) handleBrandChange(selected);
                  }}
                  className="flex-1 mt-1 block border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select a brand</option>
                  {brands.map(brand => (
                    <option key={brand.id} value={brand.id}>{brand.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="mt-2 flex space-x-2">
                <input
                  type="text"
                  placeholder="New brand name"
                  value={newBrand.name}
                  onChange={(e) => setNewBrand({...newBrand, name: e.target.value})}
                  className="flex-1 mt-1 block border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={handleCreateBrand}
                  disabled={!newBrand.name}
                  className="mt-1 px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 disabled:opacity-50"
                >
                  Add
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Features</label>
              <div className="flex space-x-2">
                <select
                  value={state.features.length > 0 ? state.features[state.features.length-1].id : ''}
                  onChange={(e) => {
                    const feature = features.find(f => f.id === parseInt(e.target.value));
                    if (feature) handleAddFeature(feature);
                  }}
                  className="flex-1 mt-1 block border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a feature</option>
                  {features.map(feature => (
                    <option key={feature.id} value={feature.id}>{feature.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="mt-2 flex space-x-2">
                <input
                  type="text"
                  placeholder="New feature"
                  value={newFeature.name}
                  onChange={(e) => setNewFeature({...newFeature, name: e.target.value})}
                  className="flex-1 mt-1 block border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={handleCreateFeature}
                  disabled={!newFeature.name}
                  className="mt-1 px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 disabled:opacity-50"
                >
                  Add
                </button>
              </div>
              
              <div className="mt-2 space-y-1">
                {state.features.map(feature => (
                  <div key={feature.id} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                    <span className="text-sm">{feature.name}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(feature.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Image URL</label>
              <input
                type="text"
                name="image"
                value={state.image}
                onChange={handleImageChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {imagePreview && (
                <div className="mt-2">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="h-32 object-contain border rounded"
                    onError={() => setImagePreview('')}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => navigate('/product/List')}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={state.loading}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300"
              >
                {state.loading ? 'Creating...' : 'Create Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProductForm;