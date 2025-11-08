import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  updateProduct,
  fetchProductDetails,
} from "../../redux/slices/adminProductSlice";

const EditProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { selectedProduct, loading, error } = useSelector(
    (state) => state.adminProducts
  );

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    sizes: "",
    colors: "",
    collections: "",
    material: "",
    gender: "",
    images: [],
  });

  const [uploading, setUploading] = useState(false);

  // ✅ Fetch product details
  useEffect(() => {
    if (id) dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  // ✅ Set product data once fetched
  useEffect(() => {
    if (selectedProduct) {
      setProductData({
        ...selectedProduct,
        sizes: Array.isArray(selectedProduct.sizes)
          ? selectedProduct.sizes.join(", ")
          : selectedProduct.sizes || "",
        colors: Array.isArray(selectedProduct.colors)
          ? selectedProduct.colors.join(", ")
          : selectedProduct.colors || "",
      });
    }
  }, [selectedProduct]);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  // ✅ Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setProductData((prev) => ({
        ...prev,
        images: [...prev.images, { url: data.imageUrl, altText: "" }],
      }));
    } catch (err) {
      console.error("Image upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  // ✅ Handle image deletion
  const handleDeleteImage = (index) => {
    const updatedImages = productData.images.filter((_, i) => i !== index);
    setProductData((prev) => ({ ...prev, images: updatedImages }));
  };

  // ✅ Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedData = {
      ...productData,
      sizes: productData.sizes
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      colors: productData.colors
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean),
    };

    dispatch(updateProduct({ id, productData: formattedData }));
    navigate("/admin/products");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Edit Product</h2>

      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-6">
          {/* ✅ Name */}
          <div>
            <label className="block mb-2 font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={productData.name || ""}
              onChange={handleChange}
              className="border w-full p-2 rounded"
            />
          </div>

          {/* ✅ Price */}
          <div>
            <label className="block mb-2 font-semibold">Price</label>
            <input
              type="number"
              name="price"
              value={productData.price || 0}
              onChange={handleChange}
              className="border w-full p-2 rounded"
            />
          </div>

          {/* ✅ Count In Stock */}
          <div>
            <label className="block mb-2 font-semibold">Count In Stock</label>
            <input
              type="number"
              name="countInStock"
              value={productData.countInStock || 0}
              onChange={handleChange}
              className="border w-full p-2 rounded"
            />
          </div>

          {/* ✅ Sizes */}
          <div>
            <label className="block mb-2 font-semibold">
              Sizes (comma-separated)
            </label>
            <input
              type="text"
              name="sizes"
              value={productData.sizes || ""}
              onChange={handleChange}
              className="border w-full p-2 rounded"
              placeholder="e.g. S, M, L, XL"
            />
          </div>

          {/* ✅ Colors */}
          <div>
            <label className="block mb-2 font-semibold">
              Colors (comma-separated)
            </label>
            <input
              type="text"
              name="colors"
              value={productData.colors || ""}
              onChange={handleChange}
              className="border w-full p-2 rounded"
              placeholder="e.g. Red, Blue, Green"
            />
          </div>
        </div>

        {/* ✅ Description */}
        <div className="mt-6">
          <label className="block mb-2 font-semibold">Description</label>
          <textarea
            name="description"
            value={productData.description || ""}
            onChange={handleChange}
            className="border w-full p-2 rounded"
            rows={4}
          />
        </div>

        {/* ✅ Upload Images */}
        <div className="mt-6">
          <label className="block mb-2 font-semibold">Upload Image</label>
          <input type="file" onChange={handleImageUpload} />
          {uploading && <p>Uploading...</p>}

          <div className="flex flex-wrap gap-4 mt-4">
            {productData.images?.map((img, i) => (
              <div key={i} className="relative">
                <img
                  src={img.url}
                  alt=""
                  className="w-20 h-20 object-cover rounded shadow"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteImage(i)}
                  className="absolute top-0 right-0 bg-red-600 text-white text-xs px-1 rounded-bl"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ✅ Submit Button */}
        <button
          type="submit"
          className="mt-6 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;
