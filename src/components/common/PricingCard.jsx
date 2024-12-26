import React, { useState, useEffect } from "react";
import tick from "../../assets/circle-tick.svg";
import { Link, replace } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { useDispatch, useSelector } from "react-redux";

import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { createPaymentIntent } from "../../redux/slices/paymentSlice";
import { useNavigate } from "react-router-dom";
import { resetState } from "../../redux/slices/authSlice";

const stripePromise = loadStripe(
  "pk_test_51QWIkaBBg8UnRcHy6LiZZOsitw0AHYmTHUIMjMtSXhbn6cB1BKjCruCm9yXQDEvaaLgXUsowR8NgF18IYpSYjDPK00SPnOWbsq"
);

const PaymentForm = ({ amount, userId, planId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const paymentData = useSelector((state) => state.payment);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [clientSecret, setClientSecret] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      setPaymentStatus("Stripe.js has not loaded yet.");
      return;
    }

    // if (!clientSecret) {
    //   setLoading(false);
    //   setPaymentStatus("Payment data is not ready yet.");
    //   return;
    // }

    try {
      // Dispatch payment data to backend via Redux
      const result = await dispatch(
        createPaymentIntent({ userId, amount, planId })
      );
      const clientSecret = result.payload?.clientSecret;
      console.log("cliccccccc", clientSecret, result);
      // Confirm the payment with the retrieved client secret
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );
      console.log("paymentIntent", paymentIntent);
      if (error) {
        setPaymentStatus(`Payment failed: ${error.message}`);
      } else if (paymentIntent.status === "succeeded") {
        setPaymentStatus("Payment successful!");
        dispatch(resetState());
        navigate("/login", { replace: true });
      }
    } catch (err) {
      setPaymentStatus(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "16px" }}
    >
      <div style={{ marginBottom: "16px" }}>
        <label
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            marginBottom: "8px",
            display: "block",
          }}
        >
          Card Details
        </label>
        <div
          style={{
            border: "1px solid #ccc",
            padding: "12px",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <CardElement />
        </div>
      </div>
      <button
        type="submit"
        disabled={!stripe || loading}
        style={{
          backgroundColor: "#4D49F6",
          color: "white",
          border: "none",
          padding: "12px 20px",
          borderRadius: "8px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        {loading ? "Processing..." : `Pay ₹${amount / 100}`}
      </button>
      {paymentStatus && (
        <p
          style={{
            color: paymentStatus.includes("successful") ? "green" : "red",
            marginTop: "16px",
          }}
        >
          {paymentStatus}
        </p>
      )}
    </form>
  );
};

const Modal = ({ show, handleClose, amount, userId, planId }) => {
  if (!show) return null;
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          position: "relative",
          backgroundColor: "white",
          padding: "24px",
          borderRadius: "12px",
          width: "400px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        }}
      >
        <button
          onClick={handleClose}
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            background: "none",
            border: "none",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          &times;
        </button>
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#4D49F6",
          }}
        >
          Make a Payment
        </h2>
        <Elements stripe={stripePromise}>
          <PaymentForm amount={amount} userId={userId} planId={planId} />
        </Elements>
      </div>
    </div>
  );
};

export const PricingCard = ({
  cardId,
  id,
  category,
  duration,
  price,
  included,
  excluded,
  active,
}) => {
  console.log("id", "category", id);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const { user, loading, error, registerUser } = useSelector(
    (state) => state.auth
  );
  console.log("userDataaass", user);
  const handleOpenModal = () => setShowModal(true); // Open the modal
  const handleCloseModal = () => setShowModal(false); // Close the modal
  return (
    <div
      className={`w-[300px] py-[34px] rounded-[12px] ${
        active ? "bg-[#E6F7FF]" : "bg-[#ffffff]"
      }`}
      style={{ boxShadow: "0px 0px 4px 0px #00000040" }}
    >
      <div className="text-[#202224] font-bold text-[18px] w-full text-center">
        {category}
      </div>
      <div className="mt-[14px] text-[13px] text-[#212121] text-center font-normal">
        {duration}
      </div>
      <div className="font-extrabold text-[40px] text-[#FE5E00] leading-[40px] mt-[14px] text-center">
        {price}
      </div>
      {/* Divider */}
      <div className="mx-[24px] mt-[30px] opacity-[30%] h-[1.7px] bg-[#212121]"></div>
      <div className="flex flex-col items-center mt-[5px]">
        {/* Included Items */}
        {included.map((item, index) => (
          <div className="flex justify-start mt-[25px] w-[190px]" key={index}>
            <img src={tick} alt="tick" />
            <div className="ml-[12px] font-semibold text-[#212121] text-[14px]">
              {item}
            </div>
          </div>
        ))}
        {/* Excluded Items */}
        {excluded.map((item, index) => (
          <div className="flex justify-start mt-[25px] w-[190px]" key={index}>
            <div className="ml-[30px] font-semibold text-[#21212180] text-[14px]">
              {item}
            </div>
          </div>
        ))}
      </div>
      {/* Divider */}
      <div className="mx-[24px] mt-[50px] opacity-[30%] h-[1.7px] bg-[#212121]"></div>
      <div className="mt-[30px] flex justify-center">
        {active ? (
          <div className="bg-green-400 border-[#4D49F6] rounded-full text-[#4D49F6] font-bold text-[14px] py-[16px] px-[34px] ">
            Your Current Plan
          </div>
        ) : (
          <button
            className="border-[1.7px] border-[#4D49F6] rounded-full text-[#4D49F6] font-bold text-[14px] py-[16px] px-[34px]"
            onClick={handleOpenModal} // Open modal on click
          >
            Get Started
          </button>
        )}
      </div>
      <div className="text-center mt-[24px]">
        <Link className="text-[14px] font-semibold text-[#212121] underline">
          Start Your Free Trial
        </Link>
      </div>

      {/* Modal Component */}
      <Modal
        show={showModal}
        handleClose={handleCloseModal}
        amount={5000}
        userId={user.userId}
        planId={id}
      />
    </div>
  );
};
