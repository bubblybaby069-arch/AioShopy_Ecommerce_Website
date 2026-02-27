import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

  const { axios } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const { data } = await axios.post("/api/order/verify", { orderId });

        if (data.success) {
          toast.success("Payment Successful ✅");
          navigate("/my-orders");
        }
      } catch (error) {
        toast.error("Payment verification failed");
      }
    };

    if (orderId) {
      verifyPayment();
    }
  }, [orderId]);

  return (
    <div className="mt-20 text-center text-lg font-medium">
      Verifying Payment...
    </div>
  );
};

export default Verify;
