import { AppDispatch } from "../store";
import { WeatherService } from "../../services/WeatherService";
import {
  fetchCurrentWeatherError,
  fetchCurrentWeatherStart,
  fetchCurrentWeatherSuccess,
} from "../slices/WeatherSlice";

export const fetchCurrentWeather =
  (payload: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchCurrentWeatherStart());
      const res = await WeatherService.getCurrentWeather(payload);

      if (res.status === 200) {
        dispatch(fetchCurrentWeatherSuccess(res));
      } else {
        dispatch(fetchCurrentWeatherError(res));
      }
    } catch (e) {
      console.log(e);
    }
  };
