import React from "react";
import cloud from "../../../../assets/images/cloud.png";
import s from "./ThisDayInfo.module.scss";
import ThisDayItem from "./ThisDayItem";

export interface Item {
  iconId: string;
  name: string;
  value: string;
}
const ThisDayInfo = () => {
  const items: Item[] = [
    {
      iconId: "temp",
      name: "Температура",
      value: "20° - ощущается как 17°",
    },
    {
      iconId: "pressure",
      name: "Давление",
      value: "765 мм ртутного столба - нормальное",
    },
    {
      iconId: "precipitation",
      name: "Осадки",
      value: "Без осадков",
    },
    {
      iconId: "wind",
      name: "Ветер",
      value: "3 м/с юго-запад - легкий ветер",
    },
  ];
  return (
    <div className={s.container}>
      <div className={s.items}>
        {items.map((item) => (
          <ThisDayItem item={item} key={item.name} />
        ))}
      </div>
      <img src={cloud} alt="cloud" />
    </div>
  );
};

export default ThisDayInfo;
