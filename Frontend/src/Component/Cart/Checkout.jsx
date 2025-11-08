import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { createCheckout } from "../../redux/slices/checkoutSlice";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [checkoutId, setCheckoutId] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [ShippingAddress, setshippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  // Redirect if cart is empty
  useEffect(() => {
    if (!cart || !cart.products || cart.products.length === 0) {
      navigate("/");
    }
  }, [cart, navigate]);

  const handleCreateCheckout = async (e) => {
    e.preventDefault();
    if (
      !ShippingAddress.address ||
      !ShippingAddress.city ||
      !ShippingAddress.postalCode ||
      !ShippingAddress.country
    ) {
      alert("Please fill all required shipping fields");
      return;
    }

    if (cart && cart.products.length > 0) {
      const res = await dispatch(
        createCheckout({
          checkoutItems: cart.products,
          shippingAddress: ShippingAddress,
          paymentMethod: "COD",
          totalPrice: cart.totalPrice,
        })
      );
      if (res.payload && res.payload._id) {
        setCheckoutId(res.payload._id);
        setShowPayment(true);
      }
    }
  };

  const handlePaymentSuccess = async (details) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
        { paymentStatus: "paid", paymentDetails: details },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      await handleFinalizeCheckout(checkoutId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFinalizeCheckout = async (checkoutId) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      navigate("/order-success");
    } catch (error) {
      console.error(error);
    }
  };

  const handleCashOnDelivery = async () => {
    if (!checkoutId) {
      alert("Please complete the shipping details first.");
      return;
    }
    try {
      await handlePaymentSuccess({ method: "COD" });
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!cart || !cart.products || cart.products.length === 0)
    return <p>Your cart is empty</p>;

  // Calculate subtotal
  const subtotal = cart.products.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );
  const shipping = "Free";
  const total = subtotal;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
      {/* Left Section - Shipping / Payment */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl font-bold uppercase mb-6">Checkout</h2>

        {!showPayment ? (
          <form onSubmit={handleCreateCheckout}>
            <h3 className="text-lg mb-4">Contact Details</h3>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                value={user ? user.email : ""}
                className="w-full p-2 border rounded"
                disabled
              />
            </div>

            <h3 className="text-lg mb-4">Delivery</h3>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700">First Name</label>
                <input
                  type="text"
                  value={ShippingAddress.firstName}
                  onChange={(e) =>
                    setshippingAddress({
                      ...ShippingAddress,
                      firstName: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700">Last Name</label>
                <input
                  type="text"
                  value={ShippingAddress.lastName}
                  onChange={(e) =>
                    setshippingAddress({
                      ...ShippingAddress,
                      lastName: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Address</label>
              <input
                type="text"
                value={ShippingAddress.address}
                onChange={(e) =>
                  setshippingAddress({
                    ...ShippingAddress,
                    address: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700">City</label>
                <input
                  type="text"
                  value={ShippingAddress.city}
                  onChange={(e) =>
                    setshippingAddress({
                      ...ShippingAddress,
                      city: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700">Postal Code</label>
                <input
                  type="text"
                  value={ShippingAddress.postalCode}
                  onChange={(e) =>
                    setshippingAddress({
                      ...ShippingAddress,
                      postalCode: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Country</label>
              <input
                type="text"
                value={ShippingAddress.country}
                onChange={(e) =>
                  setshippingAddress({
                    ...ShippingAddress,
                    country: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Phone</label>
              <input
                type="tel"
                value={ShippingAddress.phone}
                onChange={(e) =>
                  setshippingAddress({
                    ...ShippingAddress,
                    phone: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition"
            >
              Continue to Payment
            </button>
          </form>
        ) : (
          <div>
            <h3 className="text-lg mb-6 font-medium">Select Payment Method</h3>
            <div className="border p-4 rounded mb-4">
              <label className="flex items-center space-x-3">
                <input type="radio" checked readOnly />
                <span>Cash on Delivery</span>
              </label>
            </div>
            <button
              onClick={handleCashOnDelivery}
              className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition"
            >
              Confirm Order (COD)
            </button>
          </div>
        )}
      </div>

      {/* Right Section - Order Summary */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

        {cart.products.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-b pb-4 mb-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded object-cover"
              />
              <div>
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-600">
                  {item.size} | {item.color}
                </p>
              </div>
            </div>
            <p className="font-semibold">${item.price}</p>
          </div>
        ))}

        {/* Subtotal & Shipping */}
        <div className="flex justify-between text-lg font-medium mb-2">
          <span>Subtotal:</span>
          <span>${subtotal}</span>
        </div>
        <div className="flex justify-between text-lg font-medium mb-4">
          <span>Shipping:</span>
          <span>{shipping}</span>
        </div>

        {/* Gray line separator */}
        <div className="border-t border-gray-300 my-4"></div>

        {/* Total */}
        <div className="flex justify-between text-xl font-semibold">
          <span>Total:</span>
          <span>${total}</span>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
