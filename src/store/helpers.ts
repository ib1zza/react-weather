const localStoragePrefix = "react-weather/";

export enum LocalStorageKey {
  history = "history",
}
const getLocalStorageItem = (key: LocalStorageKey): string | null => {
  return localStorage.getItem(localStoragePrefix + key);
};

const setLocalStorageItem = <T>(key: LocalStorageKey, value: T): void => {
  localStorage.setItem(localStoragePrefix + key, JSON.stringify(value));
};

export const getLocalStorageHistory = (): string[] => {
  return JSON.parse(getLocalStorageItem(LocalStorageKey.history) || "[]");
};

export const setLocalStorageHistory = (data: string[]): void => {
  setLocalStorageItem<string[]>(LocalStorageKey.history, data);
};
