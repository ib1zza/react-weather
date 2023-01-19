import React from "react";
import s from "./Days.module.scss";
import { Day } from "./Days";
import GlobalSvgSelector from "../../../../assets/icons/global/GlobalSvgSelector";
interface Props {
  day: Day;
}

const Card: React.FC<Props> = ({ day }) => {
  const { day: dayName, day_info, info, temp_day, icon_id, temp_night } = day;
  return (
    <div className={s.card}>
      <div className={s.day__name}>{dayName}</div>
      <div className={s.day__date}>{day_info}</div>
      <div className={s.day__img}>
        <GlobalSvgSelector id={icon_id} />
      </div>
      <div className={s.day__temp_day}>{temp_day}</div>
      <div className={s.day__temp_night}>{temp_night}</div>
      <div className={s.day__info}>{info}</div>
    </div>
  );
};

export default Card;
