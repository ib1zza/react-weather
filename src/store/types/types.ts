export interface Coord {
  lon: number;
  lat: number;
}

export interface WeatherEl {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface Wind {
  speed: number;
  deg: number;
}

export interface Clouds {
  all: number;
}

export interface Sys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface Weather {
  coord: Coord;
  weather: WeatherEl[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

interface DailyMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

interface DailyWeather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface DailyClouds {
  all: number;
}

export interface DailyWind {
  speed: number;
  deg: number;
  gust: number;
}

export type DailySys = {
  pod: "n" | "d";
};

export interface DailyRain {
  "3h": number;
}

export interface DailyList {
  dt: number;
  main: DailyMain;
  weather: DailyWeather[];
  clouds: DailyClouds;
  wind: DailyWind;
  visibility: number;
  pop: number;
  sys: DailySys;
  dt_txt: string;
  rain: DailyRain;
}

export interface DailyCoord {
  lat: number;
  lon: number;
}

export interface DailyCity {
  id: number;
  name: string;
  coord: DailyCoord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface IDailyForecast {
  cod: string;
  message: number;
  cnt: number;
  list: DailyList[];
  city: DailyCity;
}

export interface IHistoryItem {
  name: string;
  coords: {
    lat: number;
    lon: number;
  };
}
