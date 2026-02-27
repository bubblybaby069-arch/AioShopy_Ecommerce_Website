import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import toast from "react-hot-toast";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      const sessionId = searchParams.get("session_id");

      if (!sessionId) return;

      const { data } = await axios.post("/api/order/verify-payment", {
        sessionId,
      });

      if (data.success) {
        toast.success("Payment Successful");
        navigate("/my-orders");
      } else {
        toast.error("Payment verification failed");
      }
    };

    verify();
  }, []);

  return <div>Processing payment...</div>;
};

export default PaymentSuccess;
