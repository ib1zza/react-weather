import React, {useEffect} from "react";
import {Route, Routes, useLocation} from "react-router-dom";
import { AppRoute } from "./utils/AppRoute";
import Home from "./pages/Home/components/Home";
import Header from "./shared/Header/Header";
import Wrapper from "./shared/Wrapper/Wrapper";
import Footer from "./shared/Footer/Footer";

function App() {

  return (
    <div className="App">
      <Wrapper>
        <Header />
        <Routes>
          <Route path={AppRoute.HOME} element={<Home />} />
          <Route path={AppRoute.HOME + "/:city"} element={<Home />} />
        </Routes>
        <Footer />
      </Wrapper>
    </div>
  );
}

export default App;
