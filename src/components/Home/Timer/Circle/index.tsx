import React, { useEffect, useState } from "react";
import { convertStringTimeToNumberFormat } from "../../../../lib/utils";
import { useAppSelector } from "../../../App/hooks";
import useWindowDimensions from "./useWindowDimensions";
import "./Circle.css";

const Circle = () => {
  const timer = useAppSelector((state) => state.timerReducer);
  const [progressPercent, setProgressPercent] = useState<number>(0);
  useEffect(() => {
    let time = convertStringTimeToNumberFormat(timer.time);
    let multiplier = 4;
    setProgressPercent(100 - time * multiplier || 0);
  }, [timer.time]);

  const [{ radius, cx, cy }, setDimension] = useState({
    radius: 273,
    cx: 275,
    cy: 275,
  });
  const [circumference, setCircumference] = useState<number>(
    radius * 2 * Math.PI
  );
  const [offset, setOffset] = useState<number>();
  const [circleStyle] = useState({
    zIndex: 1000,
    stroke: "var(--naples-yellow)",
    strokeDasharray: `${circumference} ${circumference}`,
    strokeDashoffset: offset,
    transition: "strokeDashoffset 0.35s",
    transform: "rotate(-90deg)",
    transformOrigin: "50% 50%",
  });

  const { width } = useWindowDimensions();
  useEffect(() => {
    if (width <= 680) {
      setDimension({ radius: 122, cx: 124, cy: 124 });
      return;
    }
    setDimension({ radius: 273, cx: 275, cy: 275 });
    setCircumference(radius * 2 * Math.PI);
    setOffset(circumference - (progressPercent / 100) * circumference);
  }, [width, circumference, progressPercent, radius]);

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
          cx={cx}
          cy={cy}
        />
      </svg>
    </div>
  );
};

export default Circle;
