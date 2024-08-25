
import React from 'react';


const ProductCard: React.FC<ProductCardProps> = ({
  image,
  title,
  description,
  rating,
  price,
  tags,
}) => {

  const stars = Array.from({ length: 5 }, (_, index) => index < rating ? '★' : '☆').join('');

  return (
    <div className=" p-4 rounded-lg shadow-custom max-w-sm bg-white">
      <img src={image} alt={title} className="w-full h-48 object-cover rounded-t-lg mb-4" />
      <h2 className="text-[18px] font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 mb-2 truncate-multiline text-[14px]">{description}</p>
      <div className="flex items-center mb-2">
        <span className="text-yellow-500">{stars}</span>
        <span className="ml-2 text-gray-500">({rating})</span>
      </div>
      <p className="text-lg font-bold mb-2">{price}$</p>
      <div className='flex gap-2'>
      <span className="bg-[#fcd9c672] text-[#EA580C] px-2 py-1 font-[500] rounded-[6px] text-[12px]">{tags}</span>
      </div>
      
    </div>
  );
};

export default ProductCard;
