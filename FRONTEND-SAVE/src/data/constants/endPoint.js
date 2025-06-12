// Payments
export const createPayment = "/payments";
export const getAllPayments = "/payments";
export const getPaymentById = (id) => `/payments/${id}`;

// Users
export const registerUser = "/api/users/register";
export const loginUser = "/api/users/login";
export const getAllUsers = "/api/users";
export const getUserById = (id) => `/api/users/${id}`;
export const updateUser = (id) => `/api/users/${id}`;
export const deleteUser = (id) => `/api/users/${id}`;

// Clients
export const createIndividualClient = "/clients/particulier";
export const createBusinessClient = "/clients/entreprise";
export const getIndividualClientById = (id) => `/clients/particulier/${id}`;
export const getBusinessClientById = (id) => `/clients/entreprise/${id}`;
export const getClientByEmail = (email) => `/clients/email/${email}`;
export const getAllIndividualClients = "/clients/particuliers";
export const getAllBusinessClients = "/clients/entreprises";
export const deleteClient = (id) => `/clients/${id}`;

// Brands (déjà fourni mais inclus pour complétude)
export const createBrand = "/brands";
export const getAllBrands = "/brands";
export const getBrandById = (id) => `/brands/${id}`;
export const updateBrand = (id) => `/brands/${id}`;
export const deleteBrand = (id) => `/brands/${id}`;
export const getBrandByExactName = "/brands/by-name";
export const searchBrands = "/brands/search";

// Features (déjà fourni mais inclus pour complétude)
export const createFeature = "/api/features";
export const getAllFeatures = "/api/features";
export const getFeatureById = (id) => `/api/features/${id}`;
export const updateFeature = (id) => `/api/features/${id}`;
export const deleteFeature = (id) => `/api/features/${id}`;

// Products (déjà fourni mais inclus pour complétude)
export const createProduct = "/products";
export const getProducts = "/products";
export const getProductsByBrand = (brandId) => `/products/by-brand/${brandId}`;
export const getProductsWithFeatures = "/products/with-features";
export const searchProducts = "/products/search";
export const getProductById = (id) => `/products/${id}`;
export const updateProduct = (id) => `/products/${id}`;
export const deleteProduct = (id) => `/products/${id}`;