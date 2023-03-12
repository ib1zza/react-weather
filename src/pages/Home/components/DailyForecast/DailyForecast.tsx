import React from "react";
import { DailyList } from "../../../../store/types/types";

import s from "./DailyForecast.module.scss";

import DayForecast from "./DayForecast";

interface Forecast {
  [x: string]: { list: DailyList[] };
}

const DailyForecast: React.FC<{ forecast: Forecast }> = ({ forecast }) => {
  return (
    <div className={s.container}>
      {Object.keys(forecast).map((date) => (
        <DayForecast
          forecastInfo={forecast[date].list}
          date={date}
          key={date}
        />
      ))}
    </div>
  );
};

export default DailyForecast;
