import React from "react";
import DayForecast from "../../DailyForecast/DayForecast";
import s from "./ModalForecast.module.scss";
import { DailyList } from "../../../../../store/types/types";
import { useModalContext } from "../../Home";
import GlobalSvgSelector from "../../../../../assets/icons/global/GlobalSvgSelector";
interface Props {
  forecast: DailyList[];
  date: string;
}
const ModalForecast: React.FC<Props> = ({ forecast, date }) => {
  const { setIsOpen } = useModalContext();
  return (
    <>
      <div className={s.wrapper} onClick={() => setIsOpen(false)}>
        <div className={s.content} onClick={(e) => e.stopPropagation()}>
          <button className={s.close} onClick={() => setIsOpen(false)}>
            <GlobalSvgSelector id={"close"} />
          </button>
          <DayForecast forecastInfo={forecast} date={date} />
        </div>
      </div>
    </>
  );
};

export default ModalForecast;
