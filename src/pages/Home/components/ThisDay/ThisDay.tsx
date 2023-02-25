import React, { useEffect, useState } from "react";

import s from "./ThisDay.module.scss";
import GlobalSvgSelector from "../../../../assets/icons/global/GlobalSvgSelector";
import { Weather } from "../../../../store/types/types";

interface Props {
  weather: Weather;
}
const ThisDay: React.FC<Props> = ({ weather }) => {
  const [time, setTime] = useState<string>(
    new Date().toTimeString().split(" ")[0].split(":").slice(0, 2).join(":")
  );
  const icon_url =
    "http://openweathermap.org/img/wn/" +
    weather.weather[0].icon.slice(0, -1) +
    "d" +
    "@2x.png";
  useEffect(() => {
    const i = setInterval(
      () =>
        setTime(
          new Date()
            .toTimeString()
            .split(" ")[0]
            .split(":")
            .slice(0, 2)
            .join(":")
        ),
      60 * 1000
    );
    return () => clearInterval(i);
  }, []);
  return (
    <div className={s.container}>
      <div className={s.top_block}>
        <div className={s.top_block_wrapper}>
          <div className={s.temp}>{Math.round(weather.main.temp) + "°"}</div>
          <div className={s.today}>Сегодня</div>
        </div>
        <img src={icon_url} alt="" />
      </div>
      <div className={s.bottom_block}>
        <div className={s.time}>Время: {time}</div>
        <div className={s.city}>Город: {weather.name}</div>
      </div>
    </div>
  );
};

export default ThisDay;
