import React from "react";
import s from "../../../../shared/Header/Header.module.scss";
import Select from "react-select";
import { Theme } from "../../../../context/ThemeContext";
import { useTheme } from "../../../../hooks/useTheme";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../hooks/store";

const CitySelector = () => {
  const { theme } = useTheme();

  const navigate = useNavigate();
  let { history, currentCity } = useAppSelector((state) => state.weather);
  history = [...history].reverse();

  const options = history.length
    ? history.map((el) => ({
        value: el,
        label: el[0].toUpperCase().concat(el.slice(1)),
      }))
    : [];

  const colourStyles = {
    control: (styles: any) => ({
      ...styles,
      backgroundColor:
        theme === Theme.DARK ? "#4F4F4F" : "rgba(71, 147, 255, 0.2)",
      border: "none",
      borderRadius: "10px",
      zIndex: 100,
      height: 50,
    }),
    singleValue: (styles: any) => ({
      ...styles,
      color: theme === Theme.DARK ? "#fff" : "#000",
    }),
  };

  return (
    <Select
      className={s.select}
      styles={colourStyles}
      options={options}
      placeholder={currentCity}
      closeMenuOnScroll={true}
      // @ts-ignore
      onChange={(newValue) => navigate(newValue.value, { replace: true })}
    />
  );
};

export default CitySelector;