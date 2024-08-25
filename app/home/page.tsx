
'use client'
import React from 'react'
import ProductCard from '../components/productcard';
import useSWR from 'swr';
import { fetcher } from 'app/http/fetcher';

const HomePage = () => {

  const {data, error} = useSWR("https://dummyjson.com/products",fetcher)
  console.log()
  if (error) return <p>Error happened</p>
  if(!data) return <p>Loading..</p>
  return (
    <div className="px-[50px] py-[50px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-[#f4f3f2]">

      {data.products.map((product:any)=> {
        return  <ProductCard
        key={product.id}
        image={product.images}
        title={product.title}
        description={product.description}
        rating={product.rating}
        price={product.price}
        tag1={product.tags[0]}
        tag2={product.tags[1]}
      />
        

      })}
     
     
      
    </div>
  );
};



export default HomePage