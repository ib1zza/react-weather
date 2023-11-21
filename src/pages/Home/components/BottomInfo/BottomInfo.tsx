import React, { memo, useMemo, useState } from "react";
import Tabs from "../Tabs/Tabs";
import Days from "../Days/Days";
import s from "../Home.module.scss";
import DailyForecast from "../DailyForecast/DailyForecast";
import { Forecast, ForecastType } from "../Home";
import { createForecastObjectFromServerForecast } from "../../../../helpers";
import { useAppSelector } from "../../../../hooks/store";

const BottomInfo = () => {
  const [openedPage, setOpenedPage] = useState<ForecastType>(
    ForecastType.weekly
  );
  const { dailyForecast, history: displayHistory } = useAppSelector(
    (state) => state.weather
  );

  const gereratedForecast: Forecast | undefined = useMemo(() => {
    if (dailyForecast) {
      return createForecastObjectFromServerForecast(dailyForecast);
    }
  }, [dailyForecast]);

  console.log("gereratedForecast", gereratedForecast)
  return (
    <>
      <Tabs
        tabs={[ForecastType.weekly, ForecastType.detailed]}
        onSelect={(el) => setOpenedPage(el)}
        current={openedPage}
      />

      {gereratedForecast && (
        <>
          {openedPage === ForecastType.weekly && (
            <Days forecast={gereratedForecast} />
          )}
          {openedPage === ForecastType.detailed && (
            <div className={s.forecast}>
              <DailyForecast forecast={gereratedForecast} />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default memo(BottomInfo);
