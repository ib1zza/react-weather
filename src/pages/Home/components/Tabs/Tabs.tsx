import React from "react";
import s from "./Tabs.module.scss";
import { ForecastType } from "../Home";

interface Props {
  tabs: ForecastType[];
  onSelect: (x: ForecastType) => void;
  current: ForecastType;
}

const Tabs: React.FC<Props> = ({ tabs, onSelect, current }) => {
  console.log(tabs, onSelect);
  return (
    <div className={s.tabs}>
      <div className={s.tabs__wrapper}>
        {tabs.map((el) => (
          <div
            className={s.tab + (current === el ? " " + s.selected : "")}
            key={el}
            onClick={() => onSelect(el)}
          >
            {el}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
