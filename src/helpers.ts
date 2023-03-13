import { DailyList, IDailyForecast } from "./store/types/types";

interface Forecast {
  [x: string]: { list: DailyList[] };
}

export const createForecastObjectFromServerForecast = (
  forecast: IDailyForecast
): Forecast => {
  return forecast.list.reduce<Forecast>((previousValue, currentValue) => {
    const key = currentValue.dt_txt.split(" ")[0];
    if (previousValue.hasOwnProperty(key)) {
      previousValue[key].list.push(currentValue);
    } else {
      previousValue[key] = { list: [currentValue] };
    }
    return previousValue;
  }, {});
};
