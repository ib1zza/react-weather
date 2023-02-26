import React from "react";
import s from "./Days.module.scss";
const Tabs = () => {
  const tabs: Array<{ value: string }> = [
    {
      value: "На неделю",
    },
    {
      value: "На 10 дней",
    },
  ];
  return (
    <div className={s.tabs}>
      <div className={s.tabs__wrapper}>
        {tabs.map((_) => (
          <div className={s.tab} key={_.value}>
            {_.value}
          </div>
        ))}
      </div>
      {/*<div className={s.cancel}>Отменить</div>*/}
    </div>
  );
};

export default Tabs;
