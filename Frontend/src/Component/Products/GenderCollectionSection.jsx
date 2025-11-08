import React from "react";
import { Link } from "react-router-dom";
import mensCollectionImage from "../../assets/mens-collection.webp";
import womenCollectionImage from "../../assets/womens-collection.webp";

const GenderCollectionSection = () => {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto flex flex-col md:flex-row gap-10">
        {/* Men's Collection */}
        <div className="relative flex-1">
          <img
            src={mensCollectionImage}
            alt="Men's Collection"
            className="min-w-full h-[400px] object-cover "
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center text-white ">
            <h2 className="text-3xl md:text-4xl text-gray-200 font-bold mb-4">Men's Collection</h2>
            <Link
              to="/shop/mens"
              className="inline-block bg-orange-500 text-white px-6 py-2 rounded-md font-semibold 
                         transition duration-300 ease-in-out hover:bg-black"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* Women's Collection */}
        <div className="relative flex-1">
          <img
            src={womenCollectionImage}
            alt="Women's Collection"
            className="w-full h-[400px] object-cover "
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center text-white rounded-lg">
            <h2 className="text-3xl md:text-4xl text-gray-200 font-bold mb-4">Women's Collection</h2>
            <Link
              to="/shop/womens"
              className="inline-block bg-orange-500 text-white px-6 py-2 rounded-md font-semibold 
                         transition duration-300 ease-in-out hover:bg-black"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenderCollectionSection;
