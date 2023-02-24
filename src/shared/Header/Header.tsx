import React from "react";
import s from "./Header.module.scss";
import GlobalSvgSelector from "../../assets/icons/global/GlobalSvgSelector";
import Select from "react-select";
import { useTheme } from "../../hooks/useTheme";
import { Theme } from "../../context/ThemeContext";
import Search from "./Search/Search";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  let { history } = useAppSelector((state) => state.currentWeatherSliceReducer);
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
        theme.theme === Theme.DARK ? "#4F4F4F" : "rgba(71, 147, 255, 0.2)",
      width: "194px",
      height: "37px",
      border: "none",
      borderRadius: "10px",
      zIndex: 100,
    }),
    singleValue: (styles: any) => ({
      ...styles,
      color: theme.theme === Theme.DARK ? "#fff" : "#000",
    }),
  };

  function changeTheme() {
    theme.changeTheme(theme.theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
  }

  return (
    <header className={s.header}>
      <div className={s.wrapper + " " + s.logoBlock}>
        <div className={s.logo}>
          <GlobalSvgSelector id={"header-logo"} />
        </div>
        <h2 className={s.heading}>React weather</h2>
      </div>

      <Search />

      <div className={s.wrapper}>
        <div className={s.change_theme} onClick={changeTheme}>
          <GlobalSvgSelector id={"change-theme"} />
        </div>
        <Select
          defaultValue={options[0]}
          styles={colourStyles}
          options={options}
          placeholder={options[0]?.label}
          closeMenuOnScroll={true}
          // @ts-ignore
          onChange={(newValue) => navigate(newValue.value, { replace: true })}
        />
      </div>
    </header>
  );
};

export default Header;
