import React, { useState } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = () => {
  const url = "http://localhost:3000";
  const [image, setImage] = useState(null); // Use null instead of false
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((data) => ({ ...data, [name]: value }));
  };

  const onFileChange = (event) => {
    setImage(event.target.files[0]); // Handle file input on change
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!image) {
      alert("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image); // Append image

    try {
      const respond = await axios.post(`${url}/api/food/add`, formData);
      if (respond.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: ""
        });
        setImage(null); // Reset the image after success
        toast.success(respond.data.message);
      } else {
        alert("Failed to upload data. Please try again.");
        toast.error(respond.data.message)
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error uploading data. Please try again.");
    }
  };

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-box">
          <p>Upload Image</p>
          <label htmlFor='image'>
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt='Upload Area' />
          </label>
          <input onChange={onFileChange} type="file" id='image' hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea onChange={onChangeHandler} value={data.description} name="description" rows='6' placeholder='Write Content here'></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select onChange={onChangeHandler} name="category" id="">
              <option value="Salad">Salad</option>
              <option value="Rools">Rools</option>
              <option value="Deserts">Fried Rice</option>
              <option value="Cake">Cake</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='₹' />
          </div>
        </div>
        <button type='submit' className='add-btn'>ADD</button>
      </form>
    </div>
  );
};

export default Add;
