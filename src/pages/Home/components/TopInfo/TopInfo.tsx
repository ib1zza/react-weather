import React, { memo } from "react";
import ThisDay from "../ThisDay/ThisDay";
import ThisDayInfo from "../ThisDayInfo/ThisDayInfo";
import { useAppSelector } from "../../../../hooks/store";
import s from "../Home.module.scss";

const TopInfo = () => {
  const { weather } = useAppSelector((state) => state.weather);

  return (
    <div className={s.top_wrapper}>
      {weather && (
        <ThisDay
          icon={weather.weather[0].icon.slice(0, -1)}
          cityName={weather.name}
          currentTemp={weather.main.temp}
        />
      )}
      {weather && <ThisDayInfo weather={weather} />}
    </div>
  );
};

export default memo(TopInfo);
