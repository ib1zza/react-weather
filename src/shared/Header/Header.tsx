import React from "react";
import s from "./Header.module.scss";
import GlobalSvgSelector from "../../assets/icons/global/GlobalSvgSelector";
import Select from "react-select";
const Header = () => {
  const options = [
    { value: "city-1", label: "Санкт-Петербург" },
    { value: "city-2", label: "Москва" },
    { value: "city-3", label: "Новгород" },
  ];

  const colourStyles = {
    control: (styles: any) => ({
      ...styles,
      backgroundColor: "#dae9ff",
      width: "194px",
      height: "37px",
      border: "none",
      borderRadius: "10px",
      zIndex: 100,
    }),
  };
  return (
    <header className={s.header}>
      <div className={s.wrapper}>
        <div className={s.logo}>
          <GlobalSvgSelector id={"header-logo"} />
        </div>
        <h2 className={s.heading}>React weather</h2>
      </div>
      <div className={s.wrapper}>
        <div className={s.change_theme}>
          <GlobalSvgSelector id={"change-theme"} />
        </div>
        <Select
          defaultValue={options[0]}
          styles={colourStyles}
          options={options}
        />
      </div>
    </header>
  );
};

export default Header;
