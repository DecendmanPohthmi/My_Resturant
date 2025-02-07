import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
import axios from "axios"; // Import axios for making API calls

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});

  // Fetch cart items from the backend on component mount
  useEffect(() => {
    const fetchCartItems = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get("http://localhost:5173/api/cart", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setCartItems(response.data.cartItems);
        } catch (err) {
          console.error("Failed to fetch cart items:", err);
        }
      }
    };

    fetchCartItems();
  }, []);

  const addToCarts = async (itemId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to add items to the cart.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5173/api/cart/add",
        { itemId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    } catch (err) {
      console.error("Failed to add item to cart:", err);
    }
  };

  const removeFromCart = async (itemId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to remove items from the cart.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5173/api/cart/remove",
        { itemId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    } catch (err) {
      console.error("Failed to remove item from cart:", err);
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCarts,
    removeFromCart,
    getTotalCartAmount,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;