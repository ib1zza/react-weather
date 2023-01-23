import React, { useState } from "react";
import { Theme, ThemeContext } from "../context/ThemeContext";
import { changeCssRootVariables } from "../model/ChangeCSSRootVars";
import { storage } from "../model/storage";

interface Props {
  children: React.ReactNode;
}
const ThemeProvider: React.FC<Props> = ({ children, ...props }) => {
  const [theme, setTheme] = useState<Theme>(
    storage.getItem("theme") || Theme.LIGHT
  );
  changeCssRootVariables(theme);
  const changeTheme = (propsTheme: Theme) => {
    setTheme(propsTheme);
    changeCssRootVariables(propsTheme);
    storage.setItem("theme", propsTheme);
  };
  return (
    <ThemeContext.Provider value={{ theme, changeTheme }} {...props}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
