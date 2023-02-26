import React, { useContext } from "react";
import s from "./Days.module.scss";
import { Day } from "./Days";

import { format, isWeekend } from "date-fns";
import { DailyList } from "../../../../store/types/types";
import { ModalForecastContext, useModalContext } from "../Home";

interface Props {
  day: Day;
  forecast: DailyList[];
  date: string;
}

const getWeekDayFromDate = (date: string) => {
  return format(new Date(date), "EEE");
};

const getNormalizedDayFromDate = (date: string) => {
  return format(new Date(date), "PP").split(",")[0];
};

const Card: React.FC<Props> = ({ day, date, forecast }) => {
  const { day: dayName, day_info, info, temp_day, icon_id, temp_night } = day;
  const icon_url =
    "http://openweathermap.org/img/wn/" +
    icon_id.slice(0, -1) +
    "d" +
    "@2x.png";
  const { setDay, setIsOpen } = useModalContext();
  const handleOnClick = () => {
    setDay(dayName);
    setIsOpen(true);

    console.log("click");
  };
  return (
    <div className={s.card} onClick={handleOnClick}>
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
