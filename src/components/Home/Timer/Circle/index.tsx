import React, { useEffect, useState } from "react";
import { convertStringTimeToNumberFormat } from "../../../../utils";
import { useAppSelector } from "../../../App/hooks";
import "./Circle.css";

const Circle = () => {
  const timer = useAppSelector((state) => state.timerReducer);
  const [progressPercent, setProgressPercent] = useState<number>(0);
    useEffect(() => {
      let time = convertStringTimeToNumberFormat(timer.time);
      let multiplier = 4;
      setProgressPercent(100 - time * multiplier || 0);
    }, [timer.time]);

  const radius = 273;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progressPercent / 100) * circumference;

  const circleStyle = {
    zIndex: 1000,
    stroke: "var(--naples-yellow)",
    strokeDasharray: `${circumference} ${circumference}`,
    strokeDashoffset: offset,
    transition: "strokeDashoffset 0.35s",
    transform: "rotate(-90deg)",
    transformOrigin: "50% 50%",
  };

  return (
    <div className="Circle">
      <svg className="progress-ring" width="550" height="550">
        <circle
          style={circleStyle}
          className="progress-ring__circle"
          stroke="white"
          strokeWidth="4"
          fill="transparent"
          r={radius}
          cx="275"
          cy="275"
        />
      </svg>
    </div>
  );
};

export default Circle;
