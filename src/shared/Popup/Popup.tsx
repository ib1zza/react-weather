import React from "react";
import s from "./Popup.module.scss";
import ThisDayItem from "../../pages/Home/components/ThisDayInfo/ThisDayItem";
import GlobalSvgSelector from "../../assets/icons/global/GlobalSvgSelector";

interface Item {
  iconId: string;
  name: string;
  value: string;
}

const Popup = () => {
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
    <>
      <div className={s.blur} />
      <div className={s.popup}>
        <div className={s.day}>
          <div className={s.day__temp}>12</div>
          <div className={s.day__name}>среда</div>
          <div className={s.day__img}>
            <GlobalSvgSelector id={"sun"} />
          </div>
          <div className={s.day__bottom}>
            <div className={s.day__bottom__time}>Время: {"21:54"}</div>
            <div className={s.day__bottom__city}>
              Город: {"Санкт-Петербург"}
            </div>
          </div>
        </div>
        <div className={s.items}>
          {items.map((item) => (
            <ThisDayItem item={item} key={item.name} />
          ))}
        </div>
        <div className={s.close}>
          <GlobalSvgSelector id={"close"} />
        </div>
      </div>
    </>
  );
};

export default Popup;
