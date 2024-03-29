import React from "react";
import s from "./Header.module.scss";
import GlobalSvgSelector from "../../assets/icons/global/GlobalSvgSelector";
import Search from "./Search/Search";
import ThemeToggler from "../../pages/Home/components/ThemeToggler/ThemeToggler";
import CitySelector from "../../pages/Home/components/CitySelector/CitySelector";

const Header = () => {
  return (
    <header className={s.header}>
      <div className={s.wrapper + " " + s.logoBlock}>
        <div className={s.logo}>
          <GlobalSvgSelector id={"header-logo"} />
        </div>
        <h2 className={s.heading}>React weather</h2>
      </div>

      <div className={s.searchBlock}>
        <Search />
      </div>

      <ThemeToggler />
      <div className={s.wrapper + " " + s.selectBlock}>
        <CitySelector />
      </div>
    </header>
  );
};

export default Header;
