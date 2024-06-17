// Home.js
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import "./Home.css";
import Header from '../../Components/Header/Header';
import ExploreMenu from '../../Components/ExploreMenu/ExploreMenu';
import PizzaDisplay from '../../Components/pizzadisplay/PizzaDisplay';

const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <PizzaDisplay category={category} />
    </div>
  );
}

export default Home;
