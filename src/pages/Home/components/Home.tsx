import React, { useEffect } from "react";
import s from "./Home.module.scss";
import ThisDay from "./ThisDay/ThisDay";
import ThisDayInfo from "./ThisDayInfo/ThisDayInfo";
import Days from "./Days/Days";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { fetchCurrentWeather } from "../../../store/thunks/fetchCurrentWeather";
import { stat } from "fs";
import { useParams } from "react-router-dom";
const Home = () => {
  const { city } = useParams();
  const dispatch = useAppDispatch();
  const weather = useAppSelector(
    (state) => state.currentWeatherSliceReducer.weather
  );
  useEffect(() => {
    dispatch(fetchCurrentWeather(city || "paris"));
  }, [city]);
  return (
    <div className={s.home}>
      <div className={s.top_wrapper}>
        {weather && <ThisDay weather={weather} />}
        {weather && <ThisDayInfo weather={weather} />}
      </div>
      <Days />
    </div>
  );
};

export default Home;
