import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchOrderDetails } from '../redux/slices/orderSlice';

const OrderDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { orderDetails, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrderDetails(id));
  }, [dispatch, id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!orderDetails) return <p>No Order details found</p>;

  // ✅ If delivered → Paid, else → Unpaid
  const isPaid = orderDetails.isDelivered;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Order Details</h2>

      <div className="p-4 sm:p-6 rounded-lg border">
        {/* Order Info */}
        <div className="flex flex-col sm:flex-row justify-between mb-8">
          <div>
            <h3 className="text-lg md:text-xl font-semibold">
              Order ID: #{orderDetails._id}
            </h3>
            <p className="text-gray-600">
              {new Date(orderDetails.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="flex flex-col items-start sm:items-end mt-4 sm:mt-0 space-y-2">
            {/* Payment Status */}
            <span
              className={`${
                isPaid
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              } px-3 py-1 rounded-full text-sm font-medium`}
            >
              {isPaid ? 'Paid' : 'Unpaid'}
            </span>

            {/* Delivery Status */}
            <span
              className={`${
                orderDetails.isDelivered
                  ? 'bg-green-100 text-green-700'
                  : 'bg-yellow-100 text-yellow-700'
              } px-3 py-1 rounded-full text-sm font-medium`}
            >
              {orderDetails.isDelivered ? 'Delivered' : 'Pending Delivery'}
            </span>
          </div>
        </div>

        {/* Payment & Shipping Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="text-lg font-semibold mb-2">Payment Info</h4>
            <p>Payment Method: {orderDetails.paymentMethod}</p>
            <p>Status: {isPaid ? 'Paid' : 'Unpaid'}</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-2">Shipping Info</h4>
            <p>Shipping Method: {orderDetails.shippingMethod}</p>
            <p>
              Address:{' '}
              {`${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.country}`}
            </p>
          </div>
        </div>

        {/* Product List */}
        <div className="overflow-x-auto">
          <h4 className="text-lg font-semibold mb-4">Products</h4>
          <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden text-gray-700">
            <thead className="bg-gray-100 text-sm font-semibold text-gray-700">
              <tr>
                <th className="py-3 px-6 text-left">Product</th>
                <th className="py-3 px-6 text-center">Unit Price</th>
                <th className="py-3 px-6 text-center">Quantity</th>
                <th className="py-3 px-6 text-center">Total</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.orderItems.map((item) => (
                <tr
                  key={item.productId}
                  className="border-t hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 object-cover rounded-md border"
                      />
                      <Link
                        to={`/product/${item.productId}`}
                        className="text-blue-600 hover:underline font-medium text-base"
                      >
                        {item.name}
                      </Link>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center text-base">
                    ₹{item.price}
                  </td>
                  <td className="py-4 px-6 text-center text-base">
                    {item.quantity}
                  </td>
                  <td className="py-4 px-6 text-center font-semibold text-base">
                    ₹{item.price * item.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Back to Orders */}
          <Link
            to="/my-orders"
            className="text-blue-500 hover:underline block mt-4"
          >
            Back to My Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
