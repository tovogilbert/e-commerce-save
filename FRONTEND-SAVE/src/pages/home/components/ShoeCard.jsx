import React from 'react';
import { useNavigate } from 'react-router-dom';

const ShoeCard = ({ shoe,id }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white py-4 text-gray-800 rounded-lg text-left min-w-[190px] max-w-[250px]">
      <div className="w-full h-60 flex justify-center items-center bg-gray-100 rounded-t-lg overflow-hidden">
        <img
          onClick={() => navigate(`/product/${id}`)}
          src={shoe.image}
          alt={shoe.name}
          className="max-h-80 object-contain "
        />
      </div>
      <div className="px-2 mt-2">
        <p className="text-lg font-bold">{shoe.brand}</p>
        <h4 className="font-normal opacity-70">{shoe.name}</h4>
        <p className="font-bold mt-2">{shoe.price}</p>
      </div>
    </div>
  );
};

export default ShoeCard;
