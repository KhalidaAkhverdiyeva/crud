
'use client'
import React from 'react'
import ProductCard from '../components/productcard';
import useSWR from 'swr';
import { fetcher } from 'app/http/fetcher';
import LoadingSpinner from 'app/components/loadingspinner';

const HomePage = () => {

  const {data, error} = useSWR("http://localhost:3001/products",fetcher)
 
  if (error) return <p>Error happened</p>
  if(!data) return <div><LoadingSpinner/></div>
  return (
    <div className="px-[50px] py-[50px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-[#f4f3f2]">

      {data.map((product:any)=> {
        return  <ProductCard
        key={product.id}
        image={product.image}
        title={product.title}
        description={product.description}
        rating={product.rating}
        price={product.price}
        tags={product.tags}
      />
        

      })}
     
     
      
    </div>
  );
};



export default HomePage