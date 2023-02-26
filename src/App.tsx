import React, { createContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { AppRoute } from "./utils/AppRoute";
import Home from "./pages/Home/components/Home";
import MonthStatistics from "./pages/MonthStatistics/components/MonthStatistics";
import Header from "./shared/Header/Header";
import Wrapper from "./shared/Wrapper/Wrapper";

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
      </Wrapper>
    </div>
  );
}

export default App;
