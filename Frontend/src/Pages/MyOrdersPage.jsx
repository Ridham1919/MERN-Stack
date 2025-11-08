import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserOrders } from "../redux/slices/orderSlice";

const MyOrdersPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  const handleRowClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Helper to get color & label for order status
  const getStatusStyles = (status) => {
    switch (status) {
      case "Processing":
        return { color: "text-yellow-700", bg: "bg-yellow-100" };
      case "Shipped":
        return { color: "text-blue-700", bg: "bg-blue-100" };
      case "Delivered":
        return { color: "text-green-700", bg: "bg-green-100" };
      case "Cancelled":
        return { color: "text-red-700", bg: "bg-red-100" };
      default:
        return { color: "text-gray-700", bg: "bg-gray-100" };
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">My Orders</h2>

      <div className="relative shadow-md sm:rounded-lg overflow-hidden">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-2 px-4 sm:py-3">Image</th>
              <th className="py-2 px-4 sm:py-3">Order ID</th>
              <th className="py-2 px-4 sm:py-3">Created</th>
              <th className="py-2 px-4 sm:py-3">Shipping Address</th>
              <th className="py-2 px-4 sm:py-3">Items</th>
              <th className="py-2 px-4 sm:py-3">Total</th>
              <th className="py-2 px-4 sm:py-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders && orders.length > 0 ? (
              orders.map((order) => {
                const { color, bg } = getStatusStyles(order.status || "Processing");
                return (
                  <tr
                    key={order._id}
                    onClick={() => handleRowClick(order._id)}
                    className="border-b hover:bg-gray-50 cursor-pointer"
                  >
                    {/* Image */}
                    <td className="py-2 px-2 sm:py-4 sm:px-4">
                      {order.orderItems && order.orderItems.length > 0 ? (
                        <img
                          src={order.orderItems[0].image}
                          alt={order.orderItems[0].name}
                          className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg"
                        />
                      ) : (
                        <span>No Image</span>
                      )}
                    </td>

                    {/* Order ID */}
                    <td className="py-2 px-2 sm:py-4 sm:px-4 font-medium text-gray-900 whitespace-nowrap">
                      #{order._id}
                    </td>

                    {/* Date */}
                    <td className="py-2 px-2 sm:py-4 sm:px-4">
                      <div className="flex flex-col">
                        <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                        <span className="text-xs text-gray-400">
                          {new Date(order.createdAt).toLocaleTimeString()}
                        </span>
                      </div>
                    </td>

                    {/* Address */}
                    <td className="py-2 px-2 sm:py-4 sm:px-4">
                      {order.shippingAddress?.city}, {order.shippingAddress?.country}
                    </td>

                    {/* Items */}
                    <td className="py-2 px-2 sm:py-4 sm:px-4">
                      {order.orderItems ? order.orderItems.length : 0}
                    </td>

                    {/* Total */}
                    <td className="py-2 px-2 sm:py-4 sm:px-4  text-gray-800">
                      ₹{order.totalPrice}
                    </td>

                    {/* Status */}
                    <td className="py-2 px-2 sm:py-4 sm:px-4">
                      <span
                        className={`${bg} ${color} px-2 py-1 rounded-full text-xs sm:text-sm font-medium`}
                      >
                        {order.status || "Processing"}
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className="py-4 px-4 text-center text-gray-500">
                  You have no orders
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrdersPage;
