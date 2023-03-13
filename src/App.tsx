import React from "react";
import { Route, Routes } from "react-router-dom";
import { AppRoute } from "./utils/AppRoute";
import Home from "./pages/Home/components/Home";
import MonthStatistics from "./pages/MonthStatistics/components/MonthStatistics";
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
          <Route
            path={AppRoute.MONTH_STATISTICS}
            element={<MonthStatistics />}
          />
        </Routes>
        <Footer />
      </Wrapper>
    </div>
  );
}

export default App;
