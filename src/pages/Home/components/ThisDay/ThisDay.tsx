import React, { memo, useEffect, useState } from "react";

import s from "./ThisDay.module.scss";

import { Weather } from "../../../../store/types/types";
import CurrentTime from "./lib/CurrentTime";

interface Props {
  cityName: string;
  icon: string;
  currentTemp: number;
}
const ThisDay: React.FC<Props> = ({ icon, currentTemp, cityName }) => {
  const icon_url = "http://openweathermap.org/img/wn/" + icon + "d" + "@2x.png";

  return (
    <div className={s.container}>
      <div className={s.top_block}>
        <div className={s.top_block_wrapper}>
          <div className={s.temp}>{Math.round(currentTemp) + "°"}</div>
          <div className={s.today}>Сегодня</div>
        </div>
        <img src={icon_url} alt="" />
      </div>
      <div className={s.bottom_block}>
        <CurrentTime />
        <div className={s.city}>Город: {cityName}</div>
      </div>
    </div>
  );
};

export default memo(ThisDay);
