import React from "react";
import s from "./Header.module.scss";
import GlobalSvgSelector from "../../assets/icons/global/GlobalSvgSelector";
import Select from "react-select";
import { useTheme } from "../../hooks/useTheme";
import { Theme } from "../../context/ThemeContext";
import Search from "./Search/Search";
import { useAppSelector } from "../../hooks/store";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const theme = useTheme();
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
        theme.theme === Theme.DARK ? "#4F4F4F" : "rgba(71, 147, 255, 0.2)",
      border: "none",
      borderRadius: "10px",
      zIndex: 100,
      height: 50,
    }),
    singleValue: (styles: any) => ({
      ...styles,
      color: theme.theme === Theme.DARK ? "#fff" : "#000",
    }),
  };

  function changeTheme() {
    theme.changeTheme(theme.theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
  }

  const searchQueryHandler = (query: string) => {
    navigate(query, { replace: true });
  };

  return (
    <header className={s.header}>
      <div className={s.wrapper + " " + s.logoBlock}>
        <div className={s.logo}>
          <GlobalSvgSelector id={"header-logo"} />
        </div>
        <h2 className={s.heading}>React weather</h2>
      </div>

      <div className={s.searchBlock}>
        <Search onChange={searchQueryHandler} />
      </div>

      <div
        className={s.change_theme + " " + s.changeThemeBlock}
        onClick={changeTheme}
      >
        <GlobalSvgSelector id={"change-theme"} />
      </div>
      <div className={s.wrapper + " " + s.selectBlock}>
        <Select
          className={s.select}
          styles={colourStyles}
          options={options}
          placeholder={currentCity}
          closeMenuOnScroll={true}
          // @ts-ignore
          onChange={(newValue) => navigate(newValue.value, { replace: true })}
        />
      </div>
    </header>
  );
};

export default Header;
