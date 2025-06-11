import React, { useState, useEffect } from 'react';
import { FaChevronRight, FaChevronLeft, FaArrowRight } from "react-icons/fa";
import productService from '../../services/productService';
import ShoeCard from './components/ShoeCard';
import greenShoe from '../../assets/images/home/greenShoe.svg';
import TopBar from '../../components/TopBar';
import Footer from "../../components/Footer";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const visibleShoes = 5;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productService.getAll();
        setProducts(response);
      } catch (error) {
        console.error("Erreur chargement des produits :", error);
      }
    };
    fetchProducts();
  }, []);

  const nextSlide = () => {
    if (startIndex + visibleShoes < products.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const prevSlide = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <>
      <TopBar />
      <div className='w-full overflow-y-auto flex-grow pt-16 bg-white xl:px-45'>
        <section className='relative bg-gray-100 py-9 mt-5 rounded-2xl mx-5 flex flex-col-reverse justify-center items-center md:flex-row md:justify-between md:px-10 xl:pl-20 lg:h-100 xl:h-120 xl:mt-10 xl:pr-10 2xl:pr-50 lg:pr-20 md:pr-15 2xl:max-w-8xl'>
          <div className='text-center md:text-left lg:mr-10'>
            <p className='text-orange-600 text-4xl font-bold mt-4 mb-1 opacity-90 xl:leading-20'>25% OFF</p>
            <h1 className='text-5xl font-bold text-gray-950 opacity-90'>Summer Sale</h1>
            <p className='text-[15px] inline-block mx-2 text-gray-600 leading-17'>Discover our summer styles with discount</p>
            <button className='mt-4 w-full py-2 text-white rounded-md bg-black text-lg font-bold flex items-center justify-center opacity-90'>
              Shop Now <FaArrowRight className='ml-5 text-[15px]' />
            </button>
          </div>
          <div className='w-53 md:w-70 lg:w-100 xl:w-100'>
            <img src={greenShoe} alt='Green Shoe' className='w-full' />
          </div>
        </section>

        <section className="p-6">
          <h2 className="text-[26px] text-gray-950 font-bold mt-7">Explore our latest drops</h2>

          <div className="flex space-x-4 overflow-x-auto">
            {products.slice(startIndex, startIndex + visibleShoes).map((product) => (
              <ShoeCard key={product.id} id={product.id} shoe={{
                key: product.id,
                id:product.id,
                name: product.name,
                brand: product.brand?.name,
                price: `€ ${product.priceExclTax} `,
                image: product.image
              }} />
            ))}
          </div>

          <div className="flex justify-start items-center text-gray-700 space-x-6 mt-4 lg:hidden">
            <button onClick={prevSlide} disabled={startIndex === 0} className="p-2 bg-gray-100 rounded-full disabled:opacity-80">
              <FaChevronLeft className="text-lg" />
            </button>
            <button onClick={nextSlide} disabled={startIndex + visibleShoes >= products.length} className="p-2 bg-gray-100 rounded-full disabled:opacity-80">
              <FaChevronRight className="text-lg" />
            </button>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Home;
