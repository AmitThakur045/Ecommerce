import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import webFont from "webfontloader";
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";

import "./App.css";

function App() {
  // Load Google Fonts
  React.useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);

  return (
    <Router>
      <Header />

      <Footer />
    </Router>
  );
}

export default App;
