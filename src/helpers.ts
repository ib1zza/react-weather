import { DailyList, IDailyForecast } from "./store/types/types";

interface Forecast {
  [x: string]: { list: DailyList[] };
}

export const createForecastObjectFromServerForecast = (
  forecast: IDailyForecast | null
): Forecast | null => {
  return forecast
    ? forecast.list.reduce((previousValue, currentValue) => {
        const date = currentValue.dt_txt;

        const key = date.split(" ")[0];

        if (previousValue.hasOwnProperty(key)) {
          // @ts-ignore
          previousValue[key].list.push(currentValue);
        } else {
          // @ts-ignore
          previousValue[key] = { list: [currentValue] };
        }
        return previousValue;
      }, {})
    : null;
};
