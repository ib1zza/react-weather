import React from "react";
import s from "./ThisDayInfo.module.scss";
import ThisDayItem from "./ThisDayItem";
import { Weather } from "../../../../store/types/types";

export interface Item {
  iconId: string;
  name: string;
  value: string;
}

interface Props {
  weather: Weather;
}
const ThisDayInfo: React.FC<Props> = ({ weather }) => {
  let { pressure, temp, feels_like } = weather.main;
  let { main: weatherType, description: weatherDescription } =
    weather.weather[0];
  let { speed, deg } = weather.wind;
  pressure *= 0.750063755419211;
  const items: Item[] = [
    {
      iconId: "temp",
      name: "Температура",
      value:
        temp.toFixed(0) +
        "°" +
        " - ощущается как " +
        feels_like.toFixed(0) +
        "°",
    },
    {
      iconId: "pressure",
      name: "Давление",
      value: pressure.toFixed(0) + " мм ртутного столба",
    },
    {
      iconId: "precipitation",
      name: "Погода",
      value: weatherDescription,
    },
    {
      iconId: "wind",
      name: "Ветер",
      value: speed.toFixed(0) + " м/с " + deg + "° - легкий ветер",
    },
  ];
  return (
    <div className={s.container}>
      <div className={s.items}>
        {items.map((item) => (
          <ThisDayItem item={item} key={item.name} />
        ))}
      </div>
    </div>
  );
};

export default ThisDayInfo;
