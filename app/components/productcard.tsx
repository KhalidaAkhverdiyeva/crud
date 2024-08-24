
import React from 'react';


interface ProductCardProps {
  image: string;
  title: string;
  description: string;
  rating: number;
  price: string;
  tag: string;
}


const ProductCard: React.FC<ProductCardProps> = ({
  image,
  title,
  description,
  rating,
  price,
  tag
}) => {

  const stars = Array.from({ length: 5 }, (_, index) => index < rating ? '★' : '☆').join('');

  return (
    <div className=" p-4 rounded-lg shadow-custom max-w-sm bg-white">
      <img src={image} alt={title} className="w-full h-48 object-cover rounded-t-lg mb-4" />
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 mb-2">{description}</p>
      <div className="flex items-center mb-2">
        <span className="text-yellow-500">{stars}</span>
        <span className="ml-2 text-gray-500">({rating})</span>
      </div>
      <p className="text-lg font-bold mb-2">{price}</p>
      <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">{tag}</span>
    </div>
  );
};

export default ProductCard;
