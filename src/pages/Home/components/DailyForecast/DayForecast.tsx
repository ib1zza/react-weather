import React from "react";
import s from "./DailyForecast.module.scss";
import { format, isWeekend } from "date-fns";
import { DailyList } from "../../../../store/types/types";
import PeriodContainer from "./PeriodContainer";

interface Props {
  forecastInfo: DailyList[];
  date: string;
}

const DayForecast: React.FC<Props> = ({ forecastInfo, date }) => {
  return (
    <div className={s.forecast}>
      <div className={s.date_info}>
        <h1 className={s.heading__day}>
          <div
            className={
              s.dayname +
              (isWeekend(new Date(date)) ? " " + s.dayname_weekend : "")
            }
          >
            {format(new Date(date), "d")}
          </div>
          <div className={s.heading_desc}>
            <span className={s.day_of_week}>
              {format(new Date(date), "EEEE")}
            </span>
            <span className={s.month}>{format(new Date(date), "LLLL")}</span>
          </div>
        </h1>
        <div className={s.heading__temperature + " " + s.heading}>
          <span>Температура</span>
        </div>
        <div className={s.heading__weather + " " + s.heading}>
          <span>Погода</span>
        </div>
        <div className={s.heading__wind + " " + s.heading}>
          <span>Ветер</span>
        </div>
      </div>

      <div className={s.periods__container}>
        {forecastInfo.map((el: DailyList) => (
          <PeriodContainer dailyList={el} key={el.dt} />
        ))}
      </div>
    </div>
  );
};

export default DayForecast;
