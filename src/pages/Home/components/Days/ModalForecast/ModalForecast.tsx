import React from "react";
import DayForecast from "../../DailyForecast/DayForecast";
import s from "./ModalForecast.module.scss";
import { DailyList } from "../../../../../store/types/types";

import GlobalSvgSelector from "../../../../../assets/icons/global/GlobalSvgSelector";
import { useAppDispatch } from "../../../../../hooks/store";
import { closeModal } from "../../../../../store/slices/ModalSlice";
interface Props {
  forecast: DailyList[];
  date: string;
}
const ModalForecast: React.FC<Props> = ({ forecast, date }) => {
  const dispatch = useAppDispatch();

  const handler = () => dispatch(closeModal());
  return (
    <>
      <div className={s.wrapper} onClick={handler}>
        <div className={s.content} onClick={(e) => e.stopPropagation()}>
          <button className={s.close} onClick={handler}>
            <GlobalSvgSelector id={"close"} />
          </button>
          <DayForecast forecastInfo={forecast} date={date} />
        </div>
      </div>
    </>
  );
};

export default ModalForecast;
