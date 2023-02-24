import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { IDailyForecast, Weather } from "../types/types";
import { AxiosError, AxiosResponse } from "axios";
import { api } from "../../axios";

const initialState: CurrentWeather = {
  dailyForecast: null,
  weather: null,
  isLoading: false,
  response: {
    status: 0,
    message: "",
  },
};
type CurrentWeather = {
  dailyForecast: IDailyForecast | null;
  weather: Weather | null;
  isLoading: boolean;
  response: {
    status: number;
    message: string;
  };
};

export const fetchCurrentWeather = createAsyncThunk<
  Weather,
  string,
  { rejectValue: string }
>(
  "weather/fetchCurrentWeather",
  async function (cityName, { rejectWithValue }) {
    return await api
      .get<Weather>(`/weather?q=${cityName}`)
      .then((res) => res.data)
      .catch(function (error: AxiosError) {
        console.log(error.toJSON());
        return rejectWithValue(error.message);
      });
  }
);

export const fetchDailyForecast = createAsyncThunk<
  IDailyForecast,
  string,
  { rejectValue: string }
>("weather/fetchDailyForecast", async function (cityName, { rejectWithValue }) {
  return await api
    .get<IDailyForecast>(`/forecast?q=${cityName} `)
    .then((res) => res.data)
    .catch(function (error: AxiosError) {
      console.log(error.toJSON());
      return rejectWithValue(error.message);
    });
});

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

  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentWeather.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCurrentWeather.fulfilled, (state, action) => {
        state.weather = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchDailyForecast.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDailyForecast.fulfilled, (state, action) => {
        state.dailyForecast = action.payload;
        state.isLoading = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        console.log("Error:" + action.payload);
        state.response.message = action.payload;
        state.isLoading = false;
      });
  },
});

export const {
  fetchCurrentWeatherStart,
  fetchCurrentWeatherSuccess,
  fetchCurrentWeatherError,
} = CurrentWeatherSlice.actions;

const isError = (action: AnyAction) => {
  return action.type.endsWith("rejected");
};

export default CurrentWeatherSlice.reducer;
