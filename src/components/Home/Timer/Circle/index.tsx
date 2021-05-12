import React, { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../../App/hooks";
import useWindowDimensions from "./useWindowDimensions";
import { ITimerMode } from "../../../../actions/timer";
import "./Circle.css";

const Circle = () => {
  const timer = useAppSelector((state) => state.timerReducer);
  const [progressPercent, setProgressPercent] = useState<number>(0);

  //Updating circle only once a second for better performance
  const latestRef = useRef<string>();
  useEffect(() => {
    if (!latestRef.current || latestRef.current !== timer.time.timeStr) {
      let latest = timer.time.timeStr;
      let time = timer.time.timeMs / 60000;
      let multiplier = 4;
      setProgressPercent(100 - time * multiplier || 0);
      latestRef.current = latest;
      return;
    }
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
  const [circleStyle, setCircleStyle] = useState({
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
      setCircumference(radius * 2 * Math.PI);
      setOffset(circumference - (progressPercent / 100) * circumference);
      setCircleStyle({
        zIndex: 1000,
        stroke: "var(--naples-yellow)",
        strokeDasharray: `${circumference} ${circumference}`,
        strokeDashoffset: timer.timerMode !== ITimerMode.Work ? 0 : offset,
        transition: "strokeDashoffset 0.35s",
        transform: "rotate(-90deg)",
        transformOrigin: "50% 50%",
      });
    } else {
      setDimension({ radius: 273, cx: 275, cy: 275 });
      setCircumference(radius * 2 * Math.PI);
      setOffset(circumference - (progressPercent / 100) * circumference);
      setCircleStyle({
        zIndex: 1000,
        stroke: "var(--naples-yellow)",
        strokeDasharray: `${circumference} ${circumference}`,
        strokeDashoffset: timer.timerMode !== ITimerMode.Work ? 0 : offset,
        transition: "strokeDashoffset 0.35s",
        transform: "rotate(-90deg)",
        transformOrigin: "50% 50%",
      });
    }
  }, [width, circumference, progressPercent, radius, timer.timerMode, offset]);

  useEffect(() => {
    if (timer.timerMode !== ITimerMode.Work) {
      setOffset(0);
    }
    setProgressPercent(0);
  }, [timer.timerMode]);

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
