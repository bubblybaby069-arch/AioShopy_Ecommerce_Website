import { useContext, useEffect, useState } from "react";
import { AppContext, useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Orders = () => {
  const boxIcon =
    "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/boxIcon.svg";

  const [orders, setOrders] = useState([]);
  const { axios } = useContext(AppContext);
  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/seller");
      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, status) => {
  try {
    const { data } = await axios.put(
      `/api/order/update-status/${orderId}`,  // ✅ dynamic id
      { status }
    );

    if (data.success) {
      toast.success("Status updated");
      fetchOrders();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error.response?.data);
    toast.error(error.response?.data?.message || "Update failed");
  }
};

return (
 <div className="w-full min-h-screen bg-gray-50 px-4 sm:px-6 md:px-10 lg:px-16 py-6">
    <h2 className="text-2xl font-semibold mb-6 md:mb-8">
      Orders Management
    </h2>

    {orders.length === 0 && (
      <p className="text-gray-500 text-sm md:text-base">
        No orders available.
      </p>
    )}

    <div className="space-y-5">
      {orders.map((order, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-md border border-gray-200 p-4 md:p-6 transition hover:shadow-lg"
        >
          {/* Header Section */}
          <div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center mb-4">
            <div>
              <p className="text-xs text-gray-500">Order ID</p>
              <p className="font-medium text-sm md:text-base break-all">
                {order._id}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Total</p>
              <p className="text-indigo-600 font-semibold text-base md:text-lg">
                ₹{order.amount}
              </p>
            </div>

            <span
              className={`self-start md:self-auto px-3 py-1 rounded-full text-xs md:text-sm font-medium ${
                order.status === "Delivered"
                  ? "bg-green-100 text-green-600"
                  : order.status === "Cancelled"
                  ? "bg-red-100 text-red-600"
                  : order.status === "Confirmed"
                  ? "bg-blue-100 text-blue-600"
                  : order.status === "Accepted"
                  ? "bg-indigo-100 text-indigo-600"
                  : "bg-yellow-100 text-yellow-600"
              }`}
            >
              {order.status}
            </span>
          </div>

          {/* Products */}
          <div className="border-t pt-4 space-y-4">
            {order.items.map((item, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    className="w-14 h-14 md:w-16 md:h-16 rounded-lg object-cover border"
                    src={`http://localhost:5000/images/${item.product.image[0]}`}
                    alt=""
                  />

                  <div>
                    <p className="font-medium text-sm md:text-base">
                      {item.product.name}
                    </p>
                    <p className="text-xs md:text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>

                <p className="font-medium text-sm md:text-base">
                  ₹{item.product.offerPrice * item.quantity}
                </p>
              </div>
            ))}
          </div>

          {/* Address + Info */}
          <div className="border-t mt-4 pt-4 text-xs md:text-sm text-gray-600 space-y-2">
            <p className="font-medium text-gray-800">
              {order.address.firstName} {order.address.lastName}
            </p>
            <p className="break-words">
              {order.address.street}, {order.address.city},{" "}
              {order.address.state} - {order.address.zipcode}
            </p>
            <p>{order.address.country}</p>

            <div className="pt-2 space-y-1">
              <p>Method: {order.paymentType}</p>
              <p>
                Date: {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p>
                Payment:{" "}
                <span
                  className={
                    order.isPaid
                      ? "text-green-600 font-medium"
                      : "text-red-500 font-medium"
                  }
                >
                  {order.isPaid ? "Paid" : "Pending"}
                </span>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-5">
            {order.status === "pending" && (
              <>
                <button
                  onClick={() => updateStatus(order._id, "Accepted")}
                  className="flex-1 sm:flex-none px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition"
                >
                  Accept
                </button>

                <button
                  onClick={() => updateStatus(order._id, "Cancelled")}
                  className="flex-1 sm:flex-none px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition"
                >
                  Reject
                </button>
              </>
            )}

            {order.status === "Accepted" && (
              <button
                onClick={() => updateStatus(order._id, "Confirmed")}
                className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition"
              >
                Confirm
              </button>
            )}

            {order.status === "Confirmed" && (
              <button
                onClick={() => updateStatus(order._id, "Delivered")}
                className="w-full sm:w-auto px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm transition"
              >
                Mark Delivered
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);
};
export default Orders;