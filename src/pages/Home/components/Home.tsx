import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
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
import { DailyList } from "../../../store/types/types";

export enum ForecastType {
  weekly = "weekly",
  detailed = "10 days detailed",
}

interface Forecast {
  [x: string]: { list: DailyList[] };
}

const Home = () => {
  const { city } = useParams();
  const dispatch = useAppDispatch();

  const {
    weather,
    dailyForecast,
    history: displayHistory,
  } = useAppSelector((state) => state.weather);
  const { forecastModalIsOpen, forecastModalDay } = useAppSelector(
    (state) => state.modal
  );

  const [openedPage, setOpenedPage] = useState<ForecastType>(
    ForecastType.weekly
  );

  useEffect(() => {
    dispatch(fetchCurrentWeather(city || displayHistory[0] || "Paris"));
    dispatch(fetchDailyForecast(city || displayHistory[0] || "Paris"));
  }, [city]);

  useEffect(() => {
    console.log("rerender home");
  });

  const newList: Forecast | undefined = useMemo(() => {
    if (dailyForecast) {
      return createForecastObjectFromServerForecast(dailyForecast);
    }
  }, [dailyForecast]);
  console.log(newList);
  return (
    <>
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

        {newList && (
          <>
            {openedPage === ForecastType.weekly && <Days forecast={newList} />}
            {openedPage === ForecastType.detailed && (
              <div className={s.forecast}>
                <DailyForecast forecast={newList} />
              </div>
            )}
          </>
        )}
      </div>

      {newList && forecastModalDay && forecastModalIsOpen && (
        <ModalForecast
          forecast={newList[forecastModalDay].list}
          date={forecastModalDay}
        />
      )}
    </>
  );
};

export default Home;
