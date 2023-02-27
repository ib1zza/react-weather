import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { IDailyForecast, Weather } from "../types/types";
import { AxiosError } from "axios";
import { api } from "../../axios";
import { getLocalStorageHistory, setLocalStorageHistory } from "../helpers";

const initialState: CurrentWeather = {
  history: getLocalStorageHistory(),
  dailyForecast: null,
  weather: null,
  isLoading: false,
  response: {
    status: 0,
    message: "",
  },
};
type CurrentWeather = {
  history: string[];
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
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentWeather.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCurrentWeather.fulfilled, (state, action) => {
        state.weather = action.payload;

        if (!state.history.includes(action.payload.name)) {
          state.history.push(action.payload.name);
          setLocalStorageHistory(
            Array.isArray(state.history) ? [...state.history] : [state.history]
          );
        }

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

export const {} = CurrentWeatherSlice.actions;

const isError = (action: AnyAction) => {
  return action.type.endsWith("rejected");
};

export default CurrentWeatherSlice.reducer;
