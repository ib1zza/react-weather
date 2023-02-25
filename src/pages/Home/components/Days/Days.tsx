import React from "react";
import s from "./Days.module.scss";
import Card from "./Card";
import Tabs from "./Tabs";
import { DailyList, IDailyForecast } from "../../../../store/types/types";
import { el } from "date-fns/locale";

export interface Day {
  day: string;
  day_info: string;
  icon_id: string;
  temp_day: string | number;
  temp_night: string | number;
  info: string;
}

interface Props {
  forecast: IDailyForecast;
}

export const Days: React.FC<Props> = ({ forecast }) => {
  const { list } = forecast;
  const newList: { [x: string]: { list: DailyList[] } } = list.reduce(
    (previousValue, currentValue, currentIndex, array) => {
      const date = currentValue.dt_txt;
      // console.log("date", date.split(" ")[0]);
      const key = date.split(" ")[0];
      // console.log(date);

      if (previousValue.hasOwnProperty(key)) {
        // @ts-ignore
        previousValue[key].list.push(currentValue);
      } else {
        // @ts-ignore
        previousValue[key] = { list: [currentValue] };
      }
      return previousValue;
    },
    {}
  );

  const displayData = Object.keys(newList).reduce<Day[]>((acc, date) => {
    const day_info = date;

    const list = newList[date].list;
    const lastElement = list[list.length - 1];
    const list_day = list.filter((el) => el.sys.pod === "d") || [lastElement];

    const list_night = list.filter((el) => el.sys.pod === "n") || [lastElement];

    const night_obj = list_night[Math.floor(list_night.length / 2)];
    const day_obj = list_day[Math.floor(list_day.length / 2)];

    const info = day_obj?.weather[0]?.main || night_obj?.weather[0]?.main;
    const temp_day = day_obj?.main?.temp || night_obj?.main?.temp;
    const temp_night = night_obj?.main?.temp;
    const icon_id = day_obj?.weather[0]?.icon || night_obj?.weather[0]?.icon;

    acc.push({
      day: day_info,
      day_info,
      icon_id,
      info,
      temp_day,
      temp_night,
    });
    return acc;
  }, []);

  const days: Day[] = [
    {
      day: "Сегодня",
      day_info: "28 авг",
      icon_id: "sun",
      temp_day: "+18",
      temp_night: "+15",
      info: "Облачно",
    },
    {
      day: "Завтра",
      day_info: "29 авг",
      icon_id: "small_rain_sun",
      temp_day: "+18",
      temp_night: "+15",
      info: "небольшой дождь и солнце",
    },
    {
      day: "Ср",
      day_info: "30 авг",
      icon_id: "small_rain",
      temp_day: "+18",
      temp_night: "+15",
      info: "небольшой дождь",
    },
    {
      day: "Чт",
      day_info: "28 авг",
      icon_id: "mainly_cloudy",
      temp_day: "+18",
      temp_night: "+15",
      info: "Облачно",
    },
    {
      day: "Пт",
      day_info: "28 авг",
      icon_id: "rain",
      temp_day: "+18",
      temp_night: "+15",
      info: "Облачно",
    },
    {
      day: "Сб",
      day_info: "28 авг",
      icon_id: "sun",
      temp_day: "+18",
      temp_night: "+15",
      info: "Облачно",
    },
    {
      day: "Вс",
      day_info: "28 авг",
      icon_id: "sun",
      temp_day: "+18",
      temp_night: "+15",
      info: "Облачно",
    },
  ];
  return (
    <>
      <Tabs />
      <div className={s.days}>
        {displayData.map((day) => (
          <Card day={day} key={day.day} />
        ))}
      </div>
    </>
  );
};

export default Days;
