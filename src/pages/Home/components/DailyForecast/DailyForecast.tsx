import React from "react";
import { DailyList, IDailyForecast } from "../../../../store/types/types";
import { add, format, isWeekend } from "date-fns";
import s from "./DailyForecast.module.scss";

const DailyForecast: React.FC<{ forecast: IDailyForecast }> = ({
  forecast,
}) => {
  const { list } = forecast;
  const newList: { [x: string]: { list: DailyList[] } } = list.reduce(
    (previousValue, currentValue, currentIndex, array) => {
      const date = currentValue.dt_txt;
      console.log("date", date.split(" ")[0]);
      const key = date.split(" ")[0];
      console.log(date);

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

  const getHoursFromDate = (date: string, hours?: number) => {
    return add(new Date(date), {
      hours: hours || 0,
    })
      .toLocaleTimeString()
      .slice(0, 5);
  };

  const getDayPeriodFromDate = (date: string, hours?: number) => {
    return format(new Date(date), "BBBB");
  };

  return (
    <div className={s.container}>
      {Object.keys(newList).map((date) => (
        <div className={s.forecast} key={date}>
          <div className={s.date_info}>
            <h1 className={s.day_of_month}>
              <div
                className={
                  s.dayname +
                  (isWeekend(new Date(date)) ? " " + s.dayname_weekend : "")
                }
              >
                {format(new Date(date), "d")}
              </div>
              <div className={s.heading_desc}>
                <span className={s.day_of_week}>
                  {format(new Date(date), "EEEE")}
                </span>
                <span className={s.month}>
                  {format(new Date(date), "LLLL")}
                </span>
              </div>
            </h1>
            <div className={s.heading__temperature + " " + s.heading}>
              <span>Температура</span>
            </div>
            <div className={s.heading__weather + " " + s.heading}>
              <span>Погода</span>
            </div>
            <div className={s.heading__wind + " " + s.heading}>
              <span>Ветер</span>
            </div>
          </div>

          <div className={s.periods__container}>
            {newList[date].list.map((el: DailyList, index, array) => (
              <div className={s.period__container} key={el.dt}>
                <div className={s.period__date}>
                  <div className={s.period__date__dayperiod}>
                    {getDayPeriodFromDate(el.dt_txt)}
                  </div>
                  <div className={s.period__date__hours}></div>
                  {getHoursFromDate(el.dt_txt) +
                    " - " +
                    getHoursFromDate(el.dt_txt, 3)}
                </div>
                <div className={s.period__temp}>
                  <span className={s.period__temp__temperature}>
                    {el.main.temp.toFixed(0) + "°"}
                  </span>
                  <span className={s.period__temp__feelslike}>
                    {", ощущается как " + el.main.feels_like.toFixed(0) + "°"}
                  </span>
                </div>
                <div className={s.period__weather}>
                  {el.weather[0].description}
                </div>
                <div className={s.period__wind}>
                  <span className={s.period__wind__speed}>
                    {el.wind.speed.toFixed(0) + " м/с "}
                  </span>
                  <span className={s.period__wind__description}>
                    {" легкий ветер"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DailyForecast;
