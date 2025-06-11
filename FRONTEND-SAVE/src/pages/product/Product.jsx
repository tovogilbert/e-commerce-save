import { useState } from "react";
import adidasWhiteShoe from "../../assets/images/product/adidasWhiteShoe.png"
import adidasBlackShoe from "../../assets/images/product/adidasBlackShoe.png" 

const Product = () => {
  const images = [ adidasBlackShoe, adidasWhiteShoe];
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
 
  return (
    <div className="max-w-xl mx-auto p-4 space-y-6">
      <div className="flex flex-col md:w-2xl space-x-5 space-y-5 p-5 justify-between  h-full w-full items-between md:flex-row">
        <div className="relative w-full">
          <img src={images[currentImage]} alt="Adidas Shoe" className=" rounded-xl" />
          <div className="absolute text-black text-2xl inset-0 flex items-center justify-between px-4">
            <button onClick={() => setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))} className="bg-gray-200 px-2 cursor-pointer  rounded-full" > 
              &#8249;
            </button>
            <button  onClick={() => setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))} className="bg-gray-200 px-2 rounded-full cursor-pointer" > &#8250; </button>
          </div>
        </div>
        <div className="bg-white w-full p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">adidas</h2>
          <p className="text-gray-500">DAILY 3.0 SHOES</p>
          <p className="text-xl font-bold">$98.99</p>
          <div className="flex items-center gap-4 my-4">
            <button  className="px-2 bg-gray-200 rounded-full text-2xl text-black font-medium cursor-pointer" onClick={() => setQuantity((prev) => Math.max(1, prev - 1))} > -</button>
            <span className="text-lg font-medium text-gray-950">{quantity}</span>
            <button  className="px-2 bg-gray-200 rounded-full text-xl text-black font-medium cursor-pointer" onClick={() => setQuantity((prev) => prev + 1)} > + </button>
          </div>
          <button className="w-full bg-black text-white py-2 rounded-lg cursor-pointer">Add to Cart</button>
        </div>
      </div>
      <div className="flex flex-col p-5 space-x-5 space-y-5 h-full md:flex-row items-center justify-between  md:w-2xl">
       <div>
        <h3 className="text-lg font-semibold">Description</h3>
          <p className="text-gray-600 mt-2">
            Energize your look with a fresh take on heritage adidas style. The adidas Daily 3.0 Shoes cut a classic profile with a modern suede upper. </p>
          <ul className="list-disc pl-5 my-2 text-gray-600">
            <li>Regular fit</li>
            <li>Lace closure</li>
            <li>Rubber outsole with vulcanized look</li>
            <li>Imported</li>
          </ul>
       </div>
        <img className="w-80 " src={adidasBlackShoe} alt="adidasBlackShoe" srcSet="" />
      </div>
    </div>
  );
};

export default Product;
