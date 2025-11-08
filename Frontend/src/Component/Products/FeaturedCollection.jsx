import React from 'react'
import { Link } from 'react-router-dom'
import featured from "../../assets/featured.webp";

const FeaturedCollection = () => {
   return (
      <section className='py-16 px-4 sm:px-6 lg:px-0 ml-2 mr-2 sm:ml-5 sm:mr-5'>
         <div className='container mx-auto flex flex-col-reverse lg:flex-row items-center bg-green-100 rounded-2xl lg:rounded-3xl overflow-hidden'>

            {/* Left Content */}
            <div className='w-full lg:w-1/2 p-6 sm:p-8 text-center lg:text-left'>
               <h2 className='text-base sm:text-lg font-semibold text-gray-700 mb-2'>
                  Comfort and Style
               </h2>
               <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6'>
                  Apparel made for your everyday life
               </h2>
               <p className='text-sm sm:text-base md:text-lg text-gray-600 mb-4 md:mb-6'>
                  Discover high-quality, comfortable clothing that effortlessly blends fashion and function.
                  Designed to make you look and feel great every day.
               </p>
               <Link
                  to="/collections/all"
                  className="inline-block bg-black text-white px-5 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base md:text-lg hover:bg-gray-800"
               >
                  Shop Now
               </Link>
            </div>

            {/* Right Content */}
            <div className='w-full lg:w-1/2'>
               <img
                  src={featured}
                  alt="Featured Collection"
                  className='w-full h-64 sm:h-80 md:h-full object-cover lg:rounded-3xl lg:rounded-br-3xl'
               />
            </div>
         </div>
      </section>

   )
}

export default FeaturedCollection