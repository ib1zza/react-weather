import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Weather } from "../types/types";
import { AxiosResponse } from "axios";

const initialState: CurrentWeather = {
  weather: null,
  isLoading: false,
  response: {
    status: 0,
    message: "",
  },
};
type CurrentWeather = {
  weather: Weather | null;
  isLoading: boolean;
  response: {
    status: number;
    message: string;
  };
};

export const CurrentWeatherSlice = createSlice({
  initialState,
  name: "currentWeather",
  reducers: {
    fetchCurrentWeatherStart(state) {
      state.isLoading = true;
    },
    fetchCurrentWeatherSuccess(
      state,
      action: PayloadAction<AxiosResponse<Weather>>
    ) {
      state.weather = action.payload.data;
      state.isLoading = false;
      state.response = {
        status: action.payload.status,
        message: action.payload.statusText,
      };
    },
    fetchCurrentWeatherError(
      state,
      action: PayloadAction<AxiosResponse<Weather>>
    ) {
      state.isLoading = false;
      state.response = {
        status: action.payload.status,
        message: action.payload.statusText,
      };
    },
  },
});

export const {
  fetchCurrentWeatherStart,
  fetchCurrentWeatherSuccess,
  fetchCurrentWeatherError,
} = CurrentWeatherSlice.actions;

export default CurrentWeatherSlice.reducer;
