import { combineReducers, configureStore } from "@reduxjs/toolkit";
import weather from "./slices/WeatherSlice";
import modal from "./slices/ModalSlice";

const rootReducer = combineReducers({
  weather,
  modal,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
