// PizzaDisplay.js
// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react';
import "./PizzaDisplay.css";
import { StoreContext } from '../../context/StoreContext';
import { assets,  } from '../../assets/Assests';

// eslint-disable-next-line react/prop-types
const PizzaDisplay = ({ category }) => {
  const { cartItems, food_list,addToCart, removeFromCart } = useContext(StoreContext);

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className='food-display-list'>
        {food_list.map((item, index) => {
        
          if (category === 'All' || category === item.category) {
            return (
              <div key={index} className='food-item'>
                <div className='food-item-img-container'>
                  <img className='food-item-image' src={"http://localhost:4005/image/"+ item.image} alt={item.name} />
                  {(cartItems[item._id] || 0) < 1 ? (
                    <img className='add' onClick={() => addToCart(item._id)} src={assets.add} alt="Add to Cart" />
                  ) : (
                    <div className='food-item-counter'>
                      <img onClick={() => addToCart(item._id)} src={assets.add} alt="Add" />
                      <p>{cartItems[item._id]}</p>
                      <img onClick={() => removeFromCart(item._id)} src={assets.remove} alt="Remove" />
                    </div>
                  )}
                </div>
                <div className="food-item-info">
                  <div className="food-item-name-rating">
                    <p>{item.name}</p>
                  </div>
                  <p className="food-item-desc">{item.description}</p>
                  <p className="food-item-price">${item.price}</p>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default PizzaDisplay;
