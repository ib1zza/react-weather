import React from "react";
import s from "./Footer.module.scss";
const Footer = () => {
  return (
    <div className={s.footer}>
      <p>Weather data by</p>
      <a href={"https://openweathermap.org/"} target={"_blank"}>
        openweathermap.org
      </a>
    </div>
  );
};

export default Footer;
