import React from "react";
import s from "./Days.module.scss";
import { Day } from "./Days";
import { format, isWeekend } from "date-fns";
import { DailyList } from "../../../../store/types/types";

import { useAppDispatch } from "../../../../hooks/store";
import { openModal } from "../../../../store/slices/ModalSlice";

interface Props {
  day: Day;
  forecast: DailyList[];
  date: string;
}

const Card: React.FC<Props> = ({ day, date, forecast }) => {
  const { day: dayName, day_info, info, temp_day, icon_id, temp_night } = day;

  const dispatch = useAppDispatch();
  const icon_url =
    "http://openweathermap.org/img/wn/" +
    icon_id.slice(0, -1) +
    "d" +
    "@2x.png";
  // const { setDay, setIsOpen } = useModalContext();

  const handleOnClick = () => {
    dispatch(openModal(dayName));
  };

  const displayWeekDay = format(new Date(dayName), "EEE");
  const displayDay = format(new Date(day_info), "PP").split(",")[0];
  const isWeekendDay = isWeekend(new Date(dayName));

  return (
    <div className={s.card} onClick={handleOnClick}>
      <div
        className={s.day__name + isWeekendDay ? " " + s.day__name_weekend : ""}
      >
        {displayWeekDay}
      </div>
      <div className={s.day__date}>{displayDay}</div>
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
