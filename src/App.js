import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import { Provider } from "./provider";
import { Container, CSSBaseStyle } from "./components/styles";
function App(props) {
  return (
    <>
      <Provider>
        <CSSBaseStyle />
        <Router>
          <Header />
          <Container>
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/explore" exact element={<Explore />} />
            </Routes>
          </Container>
        </Router>
      </Provider>
    </>
  );
}

App.propTypes = {};

export default App;
