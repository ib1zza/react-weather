import React from "react";
import s from "./Footer.module.scss";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className={s.footer}>
      <p>Weather data by</p>
      <Link to={"https://openweathermap.org/"}>openweathermap.org</Link>
    </div>
  );
};

export default Footer;
