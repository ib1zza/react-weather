import React, { useEffect } from "react";
import DayForecast from "../../DailyForecast/DayForecast";
import s from "./ModalForecast.module.scss";
import { DailyList } from "../../../../../store/types/types";
import { useModalContext } from "../../Home";
interface Props {
  forecast: DailyList[];
  date: string;
}
const ModalForecast: React.FC<Props> = ({ forecast, date }) => {
  useEffect(() => console.log("modal render"));
  const { setIsOpen } = useModalContext();
  return (
    <>
      <div className={s.wrapper} onClick={() => setIsOpen(false)}>
        <div className={s.content} onClick={(e) => e.stopPropagation()}>
          <DayForecast forecastInfo={forecast} date={date} />
        </div>
      </div>
    </>
  );
};

export default ModalForecast;
