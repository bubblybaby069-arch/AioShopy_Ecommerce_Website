import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const Success = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const sessionId = searchParams.get("session_id");

    if (sessionId) {
      axios.post("/api/order/verify-payment", {
        sessionId,
      });
    }
  }, []);

  return <h1>Payment Successful 🎉</h1>;
};

export default Success;
