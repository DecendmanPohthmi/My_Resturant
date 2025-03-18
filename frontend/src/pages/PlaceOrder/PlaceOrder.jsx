import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext'
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const PlaceOrder = () => {

    const [payment, setPayment] = useState("cod")
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    })

    const { getTotalCartAmount, token, food_list, cartItems, url, setCartItems,currency,deliveryCharge } = useContext(StoreContext);

    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data => ({ ...data, [name]: value }))
    }

    const placeOrder = async (e) => {
        e.preventDefault();
    
        let orderItems = [];
        food_list.forEach((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = { ...item, quantity: cartItems[item._id] };
                orderItems.push(itemInfo);
            }
        });
    
        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + deliveryCharge,
            phone: data.phone,  // Ensure consistent naming
        };
    
        if (payment === "razorpay") {
            try {
                let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
          
                if (response.data.success) {
                  const { order_id, amount, currency } = response.data;
          
                  const options = {
                    key: import.meta.env.VITE_RAZORPAY_KEY, // Correct way to use env variable
                    amount: amount,
                    currency: currency,
                    name: "TastyBites",
                    description: "Food Order Payment",
                    order_id: order_id,
                    handler: async function (response) {
                      const paymentData = {
                        ...orderData,
                        paymentId: response.razorpay_payment_id,
                      };
                  
                      await axios.post(url + "/api/order/saveorder", paymentData, { headers: { token } });
                      navigate("/myorders");
                      setCartItems({});
                    },
                    theme: { color: "#3399cc" },
                  };
                  
          
                  const razor = new window.Razorpay(options);
                  razor.open();
                } else {
                  alert("Error while creating Razorpay order.");
                }
              } catch (error) {
                console.error("Error in payment:", error);
                alert("Payment failed. Please try again.");
              }
          
        } else {
            try {
                let response = await axios.post(`${url}/api/order/placecod`, orderData, { headers: { token } });
    
                if (response.data.success) {
                    toast.success(response.data.message);
                    navigate("/myorders");
                    setCartItems({});
                } else {
                    toast.error("Something went wrong");
                }
            } catch (error) {
                console.error("COD order error:", error);
                toast.error("Failed to place COD order.");
            }
        }
    };
    

    useEffect(() => {
        if (!token) {
            toast.error("to place an order sign in first")
            navigate('/cart')
        }
        else if (getTotalCartAmount() === 0) {
            navigate('/cart')
        }
    }, [token])

    return (
        <form onSubmit={placeOrder} className='place-order'>
            <div className="place-order-left">
                <p className='title'>Delivery Information</p>
                <div className="multi-field">
                    <input type="text" name='firstName' onChange={onChangeHandler} value={data.firstName} placeholder='First name' required />
                    <input type="text" name='lastName' onChange={onChangeHandler} value={data.lastName} placeholder='Last name' required />
                </div>
                <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Email address' required />
                <input type="text" name='street' onChange={onChangeHandler} value={data.street} placeholder='Street' required />
                <div className="multi-field">
                    <input type="text" name='city' onChange={onChangeHandler} value={data.city} placeholder='City' required />
                    <input type="text" name='state' onChange={onChangeHandler} value={data.state} placeholder='State' required />
                </div>
                <div className="multi-field">
                    <input type="text" name='zipcode' onChange={onChangeHandler} value={data.zipcode} placeholder='Zip code' required />
                    <input type="text" name='country' onChange={onChangeHandler} value={data.country} placeholder='Country' required />
                </div>
                <input type="text" name='phone' onChange={onChangeHandler} value={data.phone} placeholder='Phone' required />
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-total-details"><p>Subtotal</p><p>{currency}{getTotalCartAmount()}</p></div>
                        <hr />
                        <div className="cart-total-details"><p>Delivery Fee</p><p>{currency}{getTotalCartAmount() === 0 ? 0 : deliveryCharge}</p></div>
                        <hr />
                        <div className="cart-total-details"><b>Total</b><b>{currency}{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + deliveryCharge}</b></div>
                    </div>
                </div>
                <div className="payment">
                    <h2>Payment Method</h2>
                    <div onClick={() => setPayment("cod")} className="payment-option">
                        <img src={payment === "cod" ? assets.checked : assets.un_checked} alt="" />
                        <p>COD ( Cash on delivery )</p>
                    </div>
                    <div onClick={() => setPayment("razorpay")} className="payment-option">
                        <img src={payment === "razorpay" ? assets.checked : assets.un_checked} alt="" />
                        <p>razorpay ( Credit / Debit )</p>
                    </div>
                </div>
                <button className='place-order-submit' type='submit'>{payment==="cod"?"Place Order":"Proceed To Payment"}</button>
            </div>
        </form>
    )
}

export default PlaceOrder
