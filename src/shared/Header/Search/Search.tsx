import React, {useCallback, useEffect, useState} from "react";
import s from "../Header.module.scss";
import GlobalSvgSelector from "../../../assets/icons/global/GlobalSvgSelector";
import { useNavigate } from "react-router-dom";
import PredictedPlaces from "../PredictedPlaces/PredictedPlaces";
import {
  fetchCurrentWeather,
  fetchCurrentWeatherByCoords,
  fetchDailyForecast,
  fetchDailyForecastByCoords, weatherActions
} from "../../../store/slices/WeatherSlice";
import {useAppDispatch} from "../../../hooks/store";

interface Props {
  value?: string;
  placeholder?: string;
}

const Search: React.FC<Props> = ({ value, placeholder }) => {
  const [query, setQuery] = useState<string>(value || "");
  const navigate = useNavigate();
  const [focused, setFocused] = useState(false);

  function onChange(query: string) {
    navigate(query, { replace: true });
  }

  useEffect(() => {
    if(query.trim().length > 2) {

    }
  }, [query]);


  const predictionShowed = query.length > 2 && focused;

  useEffect(() => {
    function listener () {
      setFocused(false);
    }
    if(focused) {
      document.body.addEventListener("click", listener, {once: true});
    }

    return () => {
        document.body.removeEventListener("click", listener);
    }
  }, [focused]);

  const dispatch = useAppDispatch();

  const handleSelect = useCallback((coords: string, name: string) => {
      dispatch(fetchCurrentWeatherByCoords(coords));
      dispatch(fetchDailyForecastByCoords(coords));
      dispatch(weatherActions.setCity(name))
      setFocused(false);
  }, [])

  console.log("focused", focused)

  return (
    <form onClick={(e) => {
      e.stopPropagation()
      setFocused(true)
    }}
      className={s.search + " " + (predictionShowed ? s.noBottomBorder : "")}
      onSubmit={(e) => {
        e.preventDefault();
        onChange(query);
      }}
    >
      <GlobalSvgSelector id={"search"} />
      <input
        type="text"
        placeholder={placeholder || "Поиск"}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className={s.predicted}>
        {predictionShowed && <PredictedPlaces onSelect={handleSelect} query={query}/>}
      </div>
    </form>
  );
};

export default Search;
