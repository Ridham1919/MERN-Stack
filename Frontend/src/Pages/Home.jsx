import React, { useEffect, useState } from 'react';
import Hero from '../Component/Layout/Hero';
import GenderCollectionSection from '../Component/Products/GenderCollectionSection';
import NewArrivals from '../Component/Products/NewArrivals';
import ProductDetails from '../Component/Products/ProductDetails';
import ProductGrid from '../Component/Products/ProductGrid';
import FeaturedCollection from '../Component/Products/FeaturedCollection';
import FeaturesSection from '../Component/Products/FeaturesSection';
import { useDispatch, useSelector } from "react-redux";
import { FetchProductsByFiltes } from '../redux/slices/productsSlice'; // ✅ match correct exported name
import axios from 'axios';

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellerProduct, setBestSellerProduct] = useState(null);

  useEffect(() => {
    //  Fetch products for a specific collection
    dispatch(
      FetchProductsByFiltes({
        gender: "Women",
        category: "Bottom Wear",
        limit: 8,
      })
    );

    //  Fetch best seller product
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
        );
        setBestSellerProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBestSeller();
  }, [dispatch]);

  return (
    <div>
      <Hero />
      <GenderCollectionSection />
      <NewArrivals />

      {/*  Best Seller */}
      <h2 className='text-3xl text-center font-bold mb-4'>Best Seller</h2>
      {bestSellerProduct ? (
        <ProductDetails productId={bestSellerProduct._id} />
      ) : (
        <p className='text-center'>Loading best seller product...</p>
      )}

      <div className='container mx-auto'>
        <h2 className='text-3xl text-center font-bold mb-4'>
          Top Wears for Women
        </h2>
        <ProductGrid products={products} loading={loading} error={error} />
      </div>

      <FeaturedCollection />
      <FeaturesSection />
    </div>
  );
};

export default Home;
