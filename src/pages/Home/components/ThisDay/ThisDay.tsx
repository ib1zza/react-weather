import React from "react";

import s from "./ThisDay.module.scss";
import GlobalSvgSelector from "../../../../assets/icons/global/GlobalSvgSelector";
const ThisDay = () => {
  return (
    <div className={s.container}>
      <div className={s.top_block}>
        <div className={s.top_block_wrapper}>
          <div className={s.temp}>20°</div>
          <div className={s.today}>Сегодня</div>
        </div>
        <GlobalSvgSelector id={"sun"} />
      </div>
      <div className={s.bottom_block}>
        <div className={s.time}>Время: {"21:54"}</div>
        <div className={s.city}>Город: {"Санкт-Петербург"}</div>
      </div>
    </div>
  );
};

export default ThisDay;
