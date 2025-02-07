import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({url}) => {
  const [list, setList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/listfood`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch data");
    }
  };

  const handleDeleteClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const removeItems = async () => {
    if (!selectedItem) return;
    try {
      const response = await axios.post(`${url}/api/food/removeFood`, { id: selectedItem._id });
      if (response.data.success) {
        toast.success("Item deleted successfully");
        setList(list.filter((item) => item._id !== selectedItem._id));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to delete item");
    }
    setShowModal(false);
    setSelectedItem(null);
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="List">
      <h2>Food List</h2>
      <div className="list-display">
        {list.length > 0 ? (
          <ul>
            {list.map((item) => (
              <li key={item._id} className="food-item">
                <img src={`${url}/images/` + item.image} alt={item.name} className="food-image" />
                <div className="food-details">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <p><strong>Price:</strong> ₹{item.price}</p>
                  <button onClick={() => handleDeleteClick(item)}>Delete Item</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No food items available.</p>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete <strong>{selectedItem?.name}</strong>?</p>
            <div className="modal-buttons">
              <button className="confirm-btn" onClick={removeItems}>Yes, Delete</button>
              <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
