// ExploreMenu.js
// eslint-disable-next-line no-unused-vars
import React from 'react';
import "./ExploreMenu.css";
import { menu_list } from '../../assets/Assests';

// eslint-disable-next-line react/prop-types
const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our menu</h1>
      <p>Choose from a diverse menu featuring a delectable array of pizzas. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
      <div className='explore-menu-list'>
        {menu_list.map((item, index) => {
          return (
            <div onClick={() => setCategory(prev => prev === item.name ? "All" : item.name)} key={index} className='explore-menu-list-item'>
              <img className={category === item.name ? "Active" : ""} src={item.image} alt='' />
              <p>{item.name}</p>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default ExploreMenu;
