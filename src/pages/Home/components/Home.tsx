import React, { useEffect } from "react";
import s from "./Home.module.scss";
import ThisDay from "./ThisDay/ThisDay";
import ThisDayInfo from "./ThisDayInfo/ThisDayInfo";
import Days from "./Days/Days";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import {
  fetchCurrentWeather,
  fetchDailyForecast,
} from "../../../store/slices/WeatherSlice";
import { useParams } from "react-router-dom";
import DailyForecast from "./DailyForecast/DailyForecast";
const Home = () => {
  const { city } = useParams();
  const dispatch = useAppDispatch();
  const { weather, dailyForecast } = useAppSelector(
    (state) => state.currentWeatherSliceReducer
  );
  useEffect(() => {
    dispatch(fetchCurrentWeather(city || "paris"));
    dispatch(fetchDailyForecast(city || "paris")).then(
      (dailyForecast) => {} // console.log(dailyForecast)
    );
  }, [city]);
  return (
    <div className={s.home}>
      <div className={s.top_wrapper}>
        {weather && <ThisDay weather={weather} />}
        {weather && <ThisDayInfo weather={weather} />}
      </div>
      {dailyForecast && <Days />}
      <div className={s.forecast}>
        {dailyForecast && <DailyForecast forecast={dailyForecast} />}
      </div>
    </div>
  );
};

export default Home;
