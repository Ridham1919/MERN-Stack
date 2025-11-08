import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-router-dom';

const NewArrivals = () => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`
        );
        setNewArrivals(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNewArrivals();
  }, []);

  // Scroll Button Update
  const updateScrollButtons = () => {
    const container = scrollRef.current;
    if (container) {
      const leftScroll = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;

      setCanScrollLeft(leftScroll > 0);
      setCanScrollRight(leftScroll < maxScroll);
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
      updateScrollButtons();
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", updateScrollButtons);
      }
    };
  }, [newArrivals]);

  return (
    <section>
      <div className='container mx-auto text-center mb-10 relative'>
        <h2 className='text-3xl font-bold mb-4'>Explore New Arrivals</h2>
        <p className='text-lg text-gray-600 mb-8'>
          Discover the latest styles straight off the runway, freshly added to keep your wardrobe on the cutting edge of fashion.
        </p>

        {/* Scroll Buttons */}
        <div className='absolute  right-0 bottom-[-30px] hidden sm:flex space-x-2'>
          <button
            className={`p-2  rounded-full border bg-white text-black ${!canScrollLeft ? "opacity-50 cursor-not-allowed" : ""} `}
            disabled={!canScrollLeft}
            onClick={() => scrollRef.current.scrollBy({ left: -300, behavior: "smooth" })}
          >
            <FiChevronLeft className='text-2xl' />
          </button>
          <button
            className={`p-2 mr-5 rounded-full border bg-white text-black ${!canScrollRight ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={!canScrollRight}
            onClick={() => scrollRef.current.scrollBy({ left: 300, behavior: "smooth" })}
          >
            <FiChevronRight className='text-2xl' />
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div ref={scrollRef} className='container mx-auto overflow-x-scroll flex space-x-6 relative pb-4 scrollbar-hide'>
        {newArrivals.map((product) => (
          <div key={product._id} className='min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative'>
            <img
              src={product.images[0]?.url}
              alt={product.images[0]?.altText || product.name}
              className='w-full h-[500px] object-cover rounded-lg'
            />
            <div className='absolute bottom-0 left-0 right-0 bg-orange-50/40 backdrop-blur-md p-4 rounded-b-lg'>
              <Link to={`/product/${product._id}`} className="block">
                <h4 className='font-medium'>{product.name}</h4>
                <p className='mt-1'>₹{product.price}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
