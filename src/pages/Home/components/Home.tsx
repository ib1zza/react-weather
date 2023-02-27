import React, { createContext, useContext, useEffect, useState } from "react";
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

import ModalForecast from "./Days/ModalForecast/ModalForecast";
import { createForecastObjectFromServerForecast } from "../../../helpers";
import DailyForecast from "./DailyForecast/DailyForecast";
import Tabs from "./Tabs/Tabs";

export const ModalForecastContext = createContext({
  isOpen: false,
  setIsOpen: (_: boolean) => {},
  day: "",
  setDay: (_: string) => {},
});

export enum ForecastType {
  weekly = "weekly",
  detailed = "10 days detailed",
}

export const useModalContext = () => useContext(ModalForecastContext);

const Home = () => {
  const { city } = useParams();
  const dispatch = useAppDispatch();
  const { weather, dailyForecast } = useAppSelector(
    (state) => state.currentWeatherSliceReducer
  );
  const [openedPage, setOpenedPage] = useState<ForecastType>(
    ForecastType.weekly
  );

  const [isOpen, setIsOpen] = useState(false);
  const [day, setDay] = useState("");

  useEffect(() => {
    console.log(isOpen, day);
  }, [isOpen, day]);
  useEffect(() => {
    dispatch(fetchCurrentWeather(city || "paris"));
    dispatch(fetchDailyForecast(city || "paris"));
  }, [city]);
  const newList = createForecastObjectFromServerForecast(dailyForecast);
  return (
    <>
      <ModalForecastContext.Provider value={{ isOpen, setIsOpen, day, setDay }}>
        {newList && (
          <div className={s.home}>
            <div className={s.top_wrapper}>
              {weather && <ThisDay weather={weather} />}
              {weather && <ThisDayInfo weather={weather} />}
            </div>
            <Tabs
              tabs={[ForecastType.weekly, ForecastType.detailed]}
              onSelect={(el) => setOpenedPage(el)}
              current={openedPage}
            />
            {openedPage === ForecastType.weekly && dailyForecast && (
              <Days forecast={newList} />
            )}
            {openedPage === ForecastType.detailed && dailyForecast && (
              <div className={s.forecast}>
                {dailyForecast && <DailyForecast forecast={newList} />}
              </div>
            )}
          </div>
        )}
        {newList && day && isOpen && (
          <ModalForecast forecast={newList[day].list} date={day} />
        )}
      </ModalForecastContext.Provider>
    </>
  );
};

export default Home;
