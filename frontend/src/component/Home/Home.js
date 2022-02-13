import React, { Fragment } from "react";
import { CgMouse } from "react-icons/all";

import Product from "./Product.js";

import "./Home.css";

// Temporary product data
const product = {
  name: "Blue Car",
  images: [
    {
      url: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGNhcnN8ZW58MHx8MHx8&w=1000&q=80", 
    },
  ],
  price: "$3000",
  _id: "abhishek",
};

const Home = () => {
  return (
    <Fragment>
      <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>Find Amazing Products Below</h1>

        <a href="#container">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>

      <h2 className="homeHeading">Featured Products</h2>

      <div className="container" id="container">
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
      </div>
    </Fragment>
  );
};

export default Home;
