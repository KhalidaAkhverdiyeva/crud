import React from 'react'
import ProductCard from '../components/productcard';

const HomePage = () => {
  const product = {
    image: 'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png',
    title: 'Sample Product',
    description: 'This is a short description of the product.',
    rating: 4,
    price: '$29.99',
    tag: 'Beauty'
  };
  return (
    <div className="px-[50px] py-[50px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-[#f4f3f2]">
      <ProductCard
        image={product.image}
        title={product.title}
        description={product.description}
        rating={product.rating}
        price={product.price}
        tag={product.tag}
      />
      <ProductCard
        image={product.image}
        title={product.title}
        description={product.description}
        rating={product.rating}
        price={product.price}
        tag={product.tag}
      />
      <ProductCard
        image={product.image}
        title={product.title}
        description={product.description}
        rating={product.rating}
        price={product.price}
        tag={product.tag}
      />
      <ProductCard
        image={product.image}
        title={product.title}
        description={product.description}
        rating={product.rating}
        price={product.price}
        tag={product.tag}
      />
      <ProductCard
        image={product.image}
        title={product.title}
        description={product.description}
        rating={product.rating}
        price={product.price}
        tag={product.tag}
      />
      
    </div>
  );
};



export default HomePage