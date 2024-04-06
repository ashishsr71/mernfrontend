import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchProducts } from '../reduxlogic/cartslice'
import {  useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { addtocart } from '../reduxlogic/ArtSlice'


    export default function Productlist() {
const putput= useSelector(state=>{
  return state.cart.products
})
const output= Array.from(putput)
console.log(output)
      const dispatch= useDispatch()
      useEffect(()=>{
        dispatch(fetchProducts())
      },[])




      return (
            <div>
         <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {output&&output.map((product) => (
            <Link to={`products/${product._id}`}>
            <div key={product._id} className="group relative">
        
                                
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={product.images[0]}
                  alt={product.images[1]}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              
              <div className="mt-4 flex justify-between">
                <div >
                  <h3 className="text-sm text-gray-700">
                    <div >
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.title}
                    </div>
                  </h3>
                  
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
               
                <p className="text-sm font-medium text-gray-900">{product.price}</p>
              
              </div>
              
            </div> 
            </Link>    
          ))}
        </div>
      </div>
    </div>
    
    </div>)
    }
    
