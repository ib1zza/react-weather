import React from "react";
import s from "./Home.module.scss";
import ThisDay from "./ThisDay/ThisDay";
import ThisDayInfo from "./ThisDayInfo/ThisDayInfo";
const Home = () => {
  return (
    <div className={s.home}>
      <div className={s.top_wrapper}>
        <ThisDay />
        <ThisDayInfo />
      </div>
    </div>
  );
};

export default Home;
