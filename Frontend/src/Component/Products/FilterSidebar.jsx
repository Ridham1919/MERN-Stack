import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 5000,
  });

  const [priceRange, setPriceRange] = useState([0, 5000]);

  // Filter options (can be connected to backend later)
  const categories = ["Top Wear", "Bottom Wear"];
  const genders = ["Men", "Women"];
  const colors = ["Red", "Blue", "Black", "Green", "White", "Gray", "Yellow", "Beige", "Navy", "Pink"];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const materials = ["Cotton", "Wool", "Denim", "Polyester", "Silk", "Linen", "Viscose", "Fleece"];
  const brands = ["Urban Threads", "Modern Fit", "Street Style", "Beach Breeze", "Fashionista", "ChicStyle"];

  // ✅ Load filters from URL
  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);

    setFilters({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: Number(params.minPrice) || 0,
      maxPrice: Number(params.maxPrice) || 5000,
    });

    setPriceRange([Number(params.minPrice) || 0, Number(params.maxPrice) || 5000]);
  }, [searchParams]);

  // ✅ Common filter handler
  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    let newFilters = { ...filters };

    if (type === "checkbox") {
      if (checked) {
        newFilters[name] = [...(newFilters[name] || []), value];
      } else {
        newFilters[name] = newFilters[name].filter((item) => item !== value);
      }
    } else {
      newFilters[name] = value;
    }

    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  // ✅ Color filter handler (circle buttons)
  const handleColorChange = (color) => {
    const newColor = filters.color === color ? "" : color;
    const newFilters = { ...filters, color: newColor };
    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  // ✅ Update URL query parameters
  const updateURLParams = (newFilters) => {
    const params = new URLSearchParams();
    Object.keys(newFilters).forEach((key) => {
      if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
        params.append(key, newFilters[key].join(","));
      } else if (newFilters[key] && newFilters[key] !== "") {
        params.append(key, newFilters[key]);
      }
    });
    setSearchParams(params);
    navigate(`?${params.toString()}`);
  };

  // ✅ Price range handler
  const handlePriceChange = (e) => {
    const newMaxPrice = Number(e.target.value);
    setPriceRange([0, newMaxPrice]);
    const newFilters = { ...filters, minPrice: 0, maxPrice: newMaxPrice };
    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Filters</h3>

      {/* Category */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-2">Category</h4>
        {categories.map((category) => (
          <label key={category} className="flex items-center mb-1 cursor-pointer">
            <input
              type="radio"
              name="category"
              value={category}
              checked={filters.category === category}
              onChange={handleFilterChange}
              className="mr-2 accent-blue-600"
            />
            <span>{category}</span>
          </label>
        ))}
      </div>

      {/* Gender */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-2">Gender</h4>
        {genders.map((gender) => (
          <label key={gender} className="flex items-center mb-1 cursor-pointer">
            <input
              type="radio"
              name="gender"
              value={gender}
              checked={filters.gender === gender}
              onChange={handleFilterChange}
              className="mr-2 accent-blue-600"
            />
            <span>{gender}</span>
          </label>
        ))}
      </div>

      {/* Color */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-2">Color</h4>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => handleColorChange(color)}
              className={`w-8 h-8 rounded-full border cursor-pointer hover:scale-110 transition ${
                filters.color === color ? "ring-2 ring-blue-500" : "border-gray-300"
              }`}
              style={{ backgroundColor: color.toLowerCase() }}
            />
          ))}
        </div>
      </div>

      {/* Size */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-2">Size</h4>
        <div className="flex flex-wrap gap-3">
          {sizes.map((size) => (
            <label key={size} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="size"
                value={size}
                checked={filters.size.includes(size)}
                onChange={handleFilterChange}
                className="accent-blue-600"
              />
              <span>{size}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Material */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-2">Material</h4>
        {materials.map((material) => (
          <label key={material} className="flex items-center mb-1 cursor-pointer">
            <input
              type="checkbox"
              name="material"
              value={material}
              checked={filters.material.includes(material)}
              onChange={handleFilterChange}
              className="mr-2 accent-blue-600"
            />
            <span>{material}</span>
          </label>
        ))}
      </div>

      {/* Brand */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-2">Brand</h4>
        {brands.map((brand) => (
          <label key={brand} className="flex items-center mb-1 cursor-pointer">
            <input
              type="checkbox"
              name="brand"
              value={brand}
              checked={filters.brand.includes(brand)}
              onChange={handleFilterChange}
              className="mr-2 accent-blue-600"
            />
            <span>{brand}</span>
          </label>
        ))}
      </div>

      {/* Price Range */}
      <div className="mb-8">
        <h4 className="font-medium text-gray-700 mb-2">Price Range</h4>
        <input
          type="range"
          min={0}
          max={5000}
          step={100}
          value={priceRange[1]}
          onChange={handlePriceChange}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <div className="flex justify-between text-gray-600 mt-2">
          <span>₹{priceRange[0]}</span>
          <span>₹{priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
