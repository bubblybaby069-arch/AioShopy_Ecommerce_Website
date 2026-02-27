import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { axios, user } = useContext(AppContext);
  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/user");
      if (data.success) {
        setMyOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);
  return (
  <div className="mt-25 pb-20 px-4 md:px-10 bg-gray-50 min-h-screen">
    <h1 className="text-3xl font-semibold mb-8">My Orders</h1>

    {myOrders.length === 0 && (
      <div className="text-gray-500 text-lg">No orders found.</div>
    )}

    {myOrders.map((order, index) => (
      <div
        key={index}
        className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 mb-8 border border-gray-200"
      >
        {/* Order Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center p-6 border-b bg-gray-50 rounded-t-2xl">
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Order ID</p>
            <p className="font-medium">{order._id}</p>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-gray-500">Payment</p>
            <p className="font-medium">{order.paymentType}</p>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-gray-500">Total</p>
            <p className="font-semibold text-lg text-indigo-600">
              ₹{order.amount}
            </p>
          </div>
        </div>

        {/* Order Items */}
        {order.items.map((item, i) => (
          <div
            key={i}
            className={`flex flex-col md:flex-row md:items-center justify-between p-6 ${
              order.items.length !== i + 1 && "border-b"
            }`}
          >
            {/* Product Info */}
            <div className="flex items-center gap-4">
              <img
                src={`http://localhost:5000/images/${item.product.image[0]}`}
                alt=""
                className="w-20 h-20 rounded-xl object-cover border"
              />

              <div>
                <h2 className="text-lg font-medium">
                  {item.product.name}
                </h2>
                <p className="text-gray-500 text-sm">
                  {item.product.category}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Quantity: {item.quantity}
                </p>
              </div>
            </div>

            {/* Status & Date */}
            <div className="mt-4 md:mt-0 text-right space-y-2">
              <span
                className={`px-4 py-1 text-sm rounded-full font-medium ${
                  order.status === "Delivered"
                    ? "bg-green-100 text-green-600"
                    : order.status === "Cancelled"
                    ? "bg-red-100 text-red-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {order.status}
              </span>

              <p className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>

              <p className="font-semibold text-lg">
                ₹{item.product.offerPrice * item.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>
    ))}
  </div>
);
};
export default MyOrders;