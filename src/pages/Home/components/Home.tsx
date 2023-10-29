import React, {
  createContext,
  memo,
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
import TopInfo from "./TopInfo/TopInfo";
import BottomInfo from "./BottomInfo/BottomInfo";

export enum ForecastType {
  weekly = "weekly",
  detailed = "10 days detailed",
}

export interface Forecast {
  [x: string]: { list: DailyList[] };
}

const Home = () => {
  const { city } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCurrentWeather(city || "Paris"));
    dispatch(fetchDailyForecast(city || "Paris"));
  }, [city]);

  return (
    <>
      <div className={s.home}>
        <TopInfo />
        <BottomInfo />
      </div>

      <ModalForecast />
    </>
  );
};

export default memo(Home);
