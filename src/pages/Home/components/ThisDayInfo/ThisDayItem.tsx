import React from "react";
import { Item } from "./ThisDayInfo";
import s from "./ThisDayInfo.module.scss";

import IndicatorSvgSelector from "../../../../assets/icons/indicators/IndicatorSvgSelector";
interface Props {
  item: Item;
}

const ThisDayItem: React.FC<Props> = ({ item }) => {
  const { value, iconId, name } = item;
  return (
    <div className={s.item}>
      <div className={s.indicator}>
        <IndicatorSvgSelector id={iconId} />
      </div>

      <div className={s.indicator__name}>{name}</div>
      <div className={s.indicator__value}>{value}</div>
    </div>
  );
};

export default ThisDayItem;
