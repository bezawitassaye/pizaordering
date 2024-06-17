// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import "./List.css";

const List = () => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get('http://localhost:4005/api/food/listfood');
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error('Error');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch data');
    }
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post("http://localhost:4005/api/food/remove", { id: foodId });
      console.log("Response:", response.data);
      // Check if the request was successful
      if (response.data.success) {
        toast.success('Food deleted successfully');
        // Refresh the list after deletion
        await fetchList();
      } else {
        toast.error('Failed to delete food');
      }
    } catch (error) {
      console.error('Error deleting food:', error);
      // Log the error response for more information
      console.log("Error response:", error.response);
      toast.error('Failed to delete food');
    }
  };
  
  useEffect(() => {
    fetchList();
  }, []); 

  return (
    <div className='list add flex-col'>
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className='list-table-format'>
            <img src={`http://localhost:4005/image/${item.image}`} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <button onClick={() => removeFood(item._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
