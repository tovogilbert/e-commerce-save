import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import productService from "../../services/productService";
import TopBar from "../../components/TopBar";
import Footer from "../../components/Footer";
import { motion, AnimatePresence } from "framer-motion";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, itemCount } = useCart();

  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [productIndex, setProductIndex] = useState(-1);
  const [quantity, setQuantity] = useState(1);
  const [showAddedToCart, setShowAddedToCart] = useState(false);

  useEffect(() => {
    setQuantity(1); 
    const fetchProduct = async () => {
      try {
        const res = await productService.getById(id);
        setProduct(res);
      } catch (error) {
        console.error("Erreur lors du chargement du produit :", error);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await productService.getAll();
        setProducts(res);
        const index = res.findIndex((p) => p.id === parseInt(id));
        setProductIndex(index);
      } catch (error) {
        console.error("Erreur lors du chargement des produits :", error);
      }
    };

    fetchAllProducts();
  }, [id]);

  const nextProduct = () => {
  if (products.length === 0) return;
  const nextIndex = (productIndex + 1) % products.length;
  const nextId = products[nextIndex].id;
  navigate(`/product/${nextId}`);
};

const prevProduct = () => {
  if (products.length === 0) return;
  const prevIndex = (productIndex - 1 + products.length) % products.length;
  const prevId = products[prevIndex].id;
  navigate(`/product/${prevId}`);
};


  const handleAddToCart = () => {
    addToCart({ 
      ...product, 
      quantity,
      price: product.priceExclTax 
    });
    setShowAddedToCart(true);
    setTimeout(() => setShowAddedToCart(false), 2000);
  };
   if (!product) return <p className="text-center mt-20 text-gray-700">Loading...</p>;
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <TopBar />
      {/* Section principale */}
      <div className="max-w-6xl mx-auto px-6 pt-28 pb-8 grid md:grid-cols-2 gap-8 items-start">
        {/* Image + navigation */}
        <div className="relative flex flex-col items-center gap-4">
          <img src={product.image} alt={product.name} className="rounded-xl w-full h-[400px] bg-gray-100 object-contain" style={{ width: '500px', height: '330px' }}/>
          {/* Contrôles de navigation */}
          <div className="flex justify-between items-center w-full px-4">
            <button onClick={prevProduct} className="bg-white px-3 text-2xl font-bold rounded-full shadow-lg hover:bg-gray-100 text-gray-700">
              &#8249;
            </button>
            <div className="flex gap-2">
              {products.map((_, index) => (
                <span key={index} className={`w-2 h-2 rounded-full ${index === productIndex ? 'bg-gray-700' : 'bg-gray-300'}`}/>
              ))}
            </div>
            <button onClick={nextProduct} className="bg-white px-3 text-2xl font-bold rounded-full shadow-lg hover:bg-gray-100 text-gray-700">
                &#8250;
            </button>
          </div>
        </div>
        {/* Informations produit */}
        <div className="bg-white p-6 rounded-xl border border-t-gray-50 shadow-lg space-y-4">
          <div>
            <h2 className="text-2xl font-semibold leading-15 text-gray-700">{product.brand?.name}</h2>
            <p className="text-gray-500 uppercase">{product.name}</p>
          </div>
          <p className="text-3xl font-bold text-gray-700">€ {product.priceExclTax}</p>
          {/* Sélecteur de quantité */}
          <hr className="bg-gray-700" />
          <p className="text-gray-700 font-bold">Quantity</p>
          <div className="flex items-center gap-4 border-1 border-gray-200 px-3 py-1 w-35 rounded-xl bg-white">            
            <button className="px-3 py-1 rounded-full text-xl font-bold hover:bg-gray-100 text-gray-700" onClick={() => setQuantity(q => Math.max(1, q - 1))}>
              -
            </button>
            <span className="text-lg text-gray-700 font-bold">{quantity}</span>
            <button className="px-3 py-1 rounded-full text-xl font-bold hover:bg-gray-100 text-gray-700" onClick={() => setQuantity(q => q + 1)}>
              +
            </button>
          </div>
          {/* Bouton d'ajout au panier */}
          <motion.button whileTap={{ scale: 0.95 }} onClick={handleAddToCart} className="w-full bg-gray-900 text-white py-3 mt-2 font-bold rounded-lg hover:bg-gray-800 transition relative" >
            Add to cart 
          </motion.button>          
        </div>
      </div>
      {/* Description et produit suivant */}
      <div className="max-w-6xl mx-auto px-6 py-6 grid md:grid-cols-2 gap-8 mb-5">
        <div className="space-y-4 rounded-xl">
          <h3 className="text-xl font-bold text-gray-900">Description</h3>
          <hr className="bg-gray-900" />
          <p className="text-gray-600">{product.description}</p>
          {product.features?.length > 0 && (
            <div className="space-y-2">
              <ul className="list-disc pl-8 md:pl-10 space-y-1 text-gray-600">
                {product.features.map((feature) => (
                  <li key={feature.id}>{feature.name}</li>
                ))}
              </ul>
            </div>
          )}
          {/* Produit suivant (mobile only) */}
          {products.length > 0 && (
            <div className="flex md:hidden rounded-xl justify-center items-center mt-6 bg-gray-100 p-4">
              <img
                src={products[(productIndex + 1) % products.length]?.image}
                alt={products[(productIndex + 1) % products.length]?.name}
                className="rounded-xl object-contain"
                style={{ width: '100%', maxWidth: '350px', height: 'auto' }}
              />
            </div>
          )}
        </div>

        {/* Produit suivant (desktop only) */}
        {products.length > 0 && (
          <div className="hidden md:flex rounded-xl lg:max-w-126 flex-col items-center bg-gray-100">
            <img
              src={products[(productIndex + 1) % products.length]?.image}
              alt={products[(productIndex + 1) % products.length]?.name}
              className="rounded-full object-contain pointer-events-none"
              style={{ width: '500px', height: '330px' }}
            />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Product;