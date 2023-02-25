import React from "react";
import s from "./Days.module.scss";
import { Day } from "./Days";
import GlobalSvgSelector from "../../../../assets/icons/global/GlobalSvgSelector";
import { format, isWeekend } from "date-fns";
import axios from "axios";
interface Props {
  day: Day;
}

const getWeekDayFromDate = (date: string) => {
  return format(new Date(date), "EEE");
};

const getNormalizedDayFromDate = (date: string) => {
  return format(new Date(date), "PP").split(",")[0];
};

const Card: React.FC<Props> = ({ day }) => {
  const { day: dayName, day_info, info, temp_day, icon_id, temp_night } = day;
  const icon_url =
    "http://openweathermap.org/img/wn/" +
    icon_id.slice(0, -1) +
    "d" +
    "@2x.png";

  return (
    <div className={s.card}>
      <div
        className={
          s.day__name +
          (isWeekend(new Date(dayName)) ? " " + s.day__name_weekend : "")
        }
      >
        {getWeekDayFromDate(dayName)}
      </div>
      <div className={s.day__date}>{getNormalizedDayFromDate(day_info)}</div>
      <div className={s.day__img}>
        <img src={icon_url} alt="" />
      </div>

      <div className={s.day__temp_day}>
        {Math.round(Number(temp_day)) + "°"}
      </div>
      <div className={s.day__temp_night}>
        {Math.round(Number(temp_night)) + "°"}
      </div>
      <div className={s.day__info}>{info}</div>
    </div>
  );
};

export default Card;
