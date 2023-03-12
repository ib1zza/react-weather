import s from "./DailyForecast.module.scss";
import React from "react";
import { DailyList } from "../../../../store/types/types";
import { add, format } from "date-fns";
import useWindowDimensions from "../../../../hooks/useWindowDimensions";

interface Props {
  dailyList: DailyList;
}

const getHoursFromDate = (date: string, hours?: number) => {
  return add(new Date(date), {
    hours: hours || 0,
  })
    .toLocaleTimeString()
    .slice(0, 5);
};

const getDayPeriodFromDate = (date: string, hours?: number) => {
  return format(new Date(date), "BBBB");
};

const PeriodContainer: React.FC<Props> = ({ dailyList }) => {
  const { width } = useWindowDimensions();

  return (
    <div className={s.period__container}>
      <div className={s.period__date}>
        <div className={s.period__date__image}>
          <img
            src={
              "http://openweathermap.org/img/wn/" +
              dailyList.weather[0].icon.slice(0, -1) +
              "d" +
              "@2x.png"
            }
            alt="icon"
          />
        </div>
        <div className={s.period__date__dayperiod}>
          {getDayPeriodFromDate(dailyList.dt_txt)}
        </div>
        <div className={s.period__date__hours}>
          {getHoursFromDate(dailyList.dt_txt) +
            " - " +
            getHoursFromDate(dailyList.dt_txt, 3)}
        </div>
      </div>
      <div className={s.period__temp}>
        <span className={s.period__temp__temperature}>
          {dailyList.main.temp.toFixed(0) + "°"}
        </span>
        <span className={s.period__temp__feelslike}>
          {", ощущается как " + dailyList.main.feels_like.toFixed(0) + "°"}
        </span>
      </div>
      <div className={s.period__weather}>
        {dailyList.weather[0].description}
      </div>
      <div className={s.period__wind}>
        <span className={s.period__wind__speed}>
          {(width < 800 ? "Ветер " : "") +
            dailyList.wind.speed.toFixed(0) +
            " м/с "}
        </span>
      </div>
    </div>
  );
};

export default PeriodContainer;
