import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import webFont from "webfontloader";
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignUp from "./component/User/LoginSignUp.js";
import Profile from "./component/User/Profile.js";
import store from "./store";
import { loadUser } from "./actions/userAction.js";
import UserOptions from "./component/layout/Header/UserOptions.js";
import "./App.css";
import { useSelector } from "react-redux";
import ProtectedRoute from "./component/Route/ProtectedRoute.js";

function App() {

  const { isAuthenticated, user } = useSelector(state => state.user);

  // Load Google Fonts
  React.useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Header />

      {isAuthenticated && <UserOptions user={user} />}
      <Route exact path="/" component={Home} />
      <Route exact path="/product/:id" component={ProductDetails} />
      <Route exact path="/products" component={Products} />
      <Route exact path="/products/:keyword" component={Products} />
      <Route exact path="/search" component={Search} />
      <ProtectedRoute exact path="/account" component={Profile} />
      <Route excat path="/login" component={LoginSignUp} />
      <Footer />
    </Router>
  );
}

export default App;
