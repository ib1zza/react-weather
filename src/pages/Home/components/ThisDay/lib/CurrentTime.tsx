import React, { useEffect, useState } from "react";
import s from "../ThisDay.module.scss";

const CurrentTime = () => {
  const [time, setTime] = useState<string>(
    new Date().toTimeString().split(" ")[0].split(":").slice(0, 2).join(":")
  );

  useEffect(() => {
    const i = setInterval(
      () =>
        setTime(
          new Date()
            .toTimeString()
            .split(" ")[0]
            .split(":")
            .slice(0, 2)
            .join(":")
        ),
      60 * 1000
    );
    return () => clearInterval(i);
  }, []);

  return <div className={s.time}>Время: {time}</div>;
};

export default CurrentTime;
