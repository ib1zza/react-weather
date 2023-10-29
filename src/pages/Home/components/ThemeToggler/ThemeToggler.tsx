import React, { memo } from "react";
import s from "../../../../shared/Header/Header.module.scss";
import GlobalSvgSelector from "../../../../assets/icons/global/GlobalSvgSelector";
import { Theme } from "../../../../context/ThemeContext";
import { useTheme } from "../../../../hooks/useTheme";

const ThemeToggler = () => {
  const { changeTheme, theme } = useTheme();

  function toggle() {
    changeTheme(theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
  }

  return (
    <button
      className={s.change_theme + " " + s.changeThemeBlock}
      onClick={toggle}
    >
      <GlobalSvgSelector id={"change-theme"} />
    </button>
  );
};

export default memo(ThemeToggler);
