import {IHistoryItem} from "./types/types";

const localStoragePrefix = "react-weather/";

export enum LocalStorageKey {
  history = "history",
}
const getLocalStorageItem = <T>(key: LocalStorageKey, fallbackValue: string = "null"): T | null => {
  return JSON.parse(localStorage.getItem(localStoragePrefix + key) || fallbackValue);
};

const setLocalStorageItem = <T>(key: LocalStorageKey, value: T): void => {
  localStorage.setItem(localStoragePrefix + key, JSON.stringify(value));
};

export const getLocalStorageHistory = (): IHistoryItem[] => {
  const res = getLocalStorageItem<IHistoryItem[]>(LocalStorageKey.history, "[]");
  if (res) {
    return res.reverse();
  }
  return []
};


export const setLocalStorageHistory = (data: IHistoryItem[]): void => {
  setLocalStorageItem(LocalStorageKey.history, data);
};

export const clearLocalStorageHistory = (): void => {
  localStorage.removeItem(localStoragePrefix + LocalStorageKey.history);
};

