
import React from 'react';


const ProductCard: React.FC<ProductCardProps> = ({
  image,
  title,
  description,
  rating,
  price,
  tag1,
  tag2
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
      <span className="bg-[#EA580C] text-white px-2 py-1 rounded-full text-[12px]">{tag1}</span>
      {tag2 && <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-[12px]">{tag2}</span> }
      
      </div>
      
    </div>
  );
};

export default ProductCard;
