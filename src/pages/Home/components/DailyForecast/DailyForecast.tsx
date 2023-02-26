import React from "react";
import { DailyList, IDailyForecast } from "../../../../store/types/types";

import s from "./DailyForecast.module.scss";

import DayForecast from "./DayForecast";

interface Forecast {
  [x: string]: { list: DailyList[] };
}

const DailyForecast: React.FC<{ forecast: IDailyForecast }> = ({
  forecast,
}) => {
  const { list } = forecast;
  const newList: Forecast = list.reduce(
    (previousValue, currentValue, currentIndex, array) => {
      const date = currentValue.dt_txt;

      const key = date.split(" ")[0];

      if (previousValue.hasOwnProperty(key)) {
        // @ts-ignore
        previousValue[key].list.push(currentValue);
      } else {
        // @ts-ignore
        previousValue[key] = { list: [currentValue] };
      }
      return previousValue;
    },
    {}
  );

  return (
    <div className={s.container}>
      {Object.keys(newList).map((date) => (
        <DayForecast forecastInfo={newList[date].list} date={date} />
      ))}
    </div>
  );
};

export default DailyForecast;
