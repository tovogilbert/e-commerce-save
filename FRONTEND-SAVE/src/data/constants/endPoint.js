//Brands 
export const createBrand = "/brands";
export const getAllBrands = "/brands";
export const getBrandById = (id) => `/brands/${id}`;
export const updateBrand = (id) => `/brands/${id}`;
export const deleteBrand = (id) => `/brands/${id}`;
export const getBrandByExactName = "/brands/by-name";
export const searchBrands = "/brands/search";

//Features
export const createFeature = "/api/features";
export const getAllFeatures = "/api/features";
export const getFeatureById = (id) => `/api/features/${id}`;
export const updateFeature = (id) => `/api/features/${id}`;
export const deleteFeature = (id) => `/api/features/${id}`;

//produit
export const createProduct = "/products";
export const getProducts = "/products";
export const getProductsByBrand = (brandId) => `/products/by-brand/${brandId}`;
export const getProductsWithFeatures = "/products/with-features";
export const searchProducts = "/products/search";
export const getProductById = (id) => `/products/${id}`;
export const updateProduct = (id) => `/products/${id}`;
export const deleteProduct = (id) => `/products/${id}`;
