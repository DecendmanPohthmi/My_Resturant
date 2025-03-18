// import axios from 'axios';
// import React, { useContext, useEffect } from 'react';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import { StoreContext } from '../../Context/StoreContext.js';
// import './Verify.css';

// const Verify = () => {
//   const { url } = useContext(StoreContext);
//   const [searchParams] = useSearchParams();  // Removed unused `setSearchParams()`
//   const navigate = useNavigate();

//   // Extract Razorpay payment parameters from URL
//   const razorpay_payment_id = searchParams.get("razorpay_payment_id");
//   const razorpay_order_id = searchParams.get("razorpay_order_id");
//   const razorpay_signature = searchParams.get("razorpay_signature");

//   const verifyPayment = async () => {
//     if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
//       navigate("/");
//       return;
//     }

//     try {
//       const response = await axios.post(`${url}/api/order/verify-payment`, {
//         razorpay_payment_id,
//         razorpay_order_id,
//         razorpay_signature
//       });

//       if (response.data.success) {
//         navigate("/myorders");
//       } else {
//         navigate("/");
//       }
//     } catch (error) {
//       console.error("Verification failed:", error);
//       navigate("/");
//     }
//   };

//   useEffect(() => {
//     verifyPayment();
//   }, []);

//   return (
//     <div className='verify'>
//       <div className="spinner"></div>
//       <p>Verifying payment...</p>
//     </div>
//   );
// };

// export default Verify;
