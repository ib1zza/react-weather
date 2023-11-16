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
import exp from "constants";

const initialState: CurrentWeather = {
  currentCity: getLocalStorageHistory()[0] || null,
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
  currentCity: string | null;
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

export const fetchCurrentWeatherByCoords = createAsyncThunk<
    Weather,
    string,
    { rejectValue: string }
>(
    "weather/fetchCurrentWeatherByCoords",
    async function (coordsString, thunkAPI) {
      const [lon, lat] = coordsString.split(" ");
      return await api
          .get<Weather>(`/weather?lat=${lat}&lon=${lon}`)
          .then((res) => {
              return res.data
          })
          .catch(function (error: AxiosError) {
            console.log(error.toJSON());
            return thunkAPI.rejectWithValue(error.message);
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

export const fetchDailyForecastByCoords = createAsyncThunk<
    IDailyForecast,
    string,
    { rejectValue: string }
>("weather/fetchDailyForecastByCoords", async function (coordsString, { rejectWithValue }) {
  const [lat, lon] = coordsString.split(" ");
  return await api
      .get<IDailyForecast>(`/forecast?lat=${lat}&lon=${lon}`)
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
      setCity(state, action: PayloadAction<string>) {
          state.currentCity = action.payload;

          if (!state.history.includes(action.payload)) {
              state.history.push(action.payload);
              setLocalStorageHistory(
                  Array.isArray(state.history) ? [...state.history] : [state.history]
              );
          }
      }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentWeather.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCurrentWeather.fulfilled, (state, action) => {
        state.weather = action.payload;
        state.currentCity = action.payload.name;

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
        .addCase(fetchCurrentWeatherByCoords.pending, (state) => {
          state.isLoading = true;
        }).addCase(fetchCurrentWeatherByCoords.fulfilled, (state, action) => {
            state.weather = action.payload;
        })
        .addCase(fetchDailyForecastByCoords.pending, (state) => {
          state.isLoading = true;
        }).addCase(fetchDailyForecastByCoords.fulfilled, (state, action) => {
            state.dailyForecast = action.payload;
        })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        console.log("Error:" + action.payload);
        state.response.message = action.payload;
        state.isLoading = false;
      });
  },
});

const isError = (action: AnyAction) => {
  return action.type.endsWith("rejected");
};

export const weatherActions = CurrentWeatherSlice.actions;

export default CurrentWeatherSlice.reducer;
