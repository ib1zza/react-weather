import React, { useMemo } from "react";
import DayForecast from "../../DailyForecast/DayForecast";
import s from "./ModalForecast.module.scss";
import { DailyList } from "../../../../../store/types/types";

import GlobalSvgSelector from "../../../../../assets/icons/global/GlobalSvgSelector";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/store";
import { closeModal } from "../../../../../store/slices/ModalSlice";
import { createForecastObjectFromServerForecast } from "../../../../../helpers";
import { Forecast } from "../../Home";
interface Props {
  forecast?: DailyList[];
  date?: string;
}
const ModalForecast: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const { dailyForecast } = useAppSelector((state) => state.weather);

  const { forecastModalIsOpen, forecastModalDay } = useAppSelector(
    (state) => state.modal
  );

  const gereratedForecast: Forecast | undefined = useMemo(() => {
    if (dailyForecast) {
      return createForecastObjectFromServerForecast(dailyForecast);
    }
  }, [dailyForecast]);

  if (!forecastModalIsOpen || !forecastModalDay || !gereratedForecast)
    return null;

  const forecast = gereratedForecast[forecastModalDay].list;

  const handler = () => dispatch(closeModal());

  return (
    <>
      <div className={s.wrapper} onClick={handler}>
        <div className={s.content} onClick={(e) => e.stopPropagation()}>
          <button className={s.close} onClick={handler}>
            <GlobalSvgSelector id={"close"} />
          </button>
          <DayForecast forecastInfo={forecast} date={forecastModalDay} />
        </div>
      </div>
    </>
  );
};

export default ModalForecast;
