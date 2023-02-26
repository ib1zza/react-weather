import React from "react";
import s from "./Days.module.scss";
import Card from "./Card";
import Tabs from "./Tabs";
import { DailyList, IDailyForecast } from "../../../../store/types/types";

import { createForecastObjectFromServerForecast } from "../../../../helpers";

export interface Day {
  day: string;
  day_info: string;
  icon_id: string;
  temp_day: string | number;
  temp_night: string | number;
  info: string;
}
interface Forecast {
  [x: string]: { list: DailyList[] };
}

interface Props {
  forecast: Forecast;
}

export const Days: React.FC<Props> = ({ forecast }) => {
  const displayData = Object.keys(forecast).reduce<Day[]>((acc, date) => {
    const day_info = date;

    const list = forecast[date].list;
    const lastElement = list[list.length - 1];
    const list_day = list.filter((el) => el.sys.pod === "d") || [lastElement];

    const list_night = list.filter((el) => el.sys.pod === "n") || [lastElement];

    const night_obj = list_night[Math.floor(list_night.length / 2)];
    const day_obj = list_day[Math.floor(list_day.length / 2)];

    const info = day_obj?.weather[0]?.main || night_obj?.weather[0]?.main;
    const temp_day = day_obj?.main?.temp || night_obj?.main?.temp;
    const temp_night = night_obj?.main?.temp;
    const icon_id = day_obj?.weather[0]?.icon || night_obj?.weather[0]?.icon;

    acc.push({
      day: day_info,
      day_info,
      icon_id,
      info,
      temp_day,
      temp_night,
    });
    return acc;
  }, []);

  return (
    <>
      <Tabs />
      <div className={s.days}>
        {displayData.map((day) => (
          <Card
            day={day}
            key={day.day}
            forecast={forecast[day.day].list}
            date={day.day}
          />
        ))}
      </div>
    </>
  );
};

export default Days;
