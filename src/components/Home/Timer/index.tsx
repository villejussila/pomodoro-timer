import React, { useEffect, useRef, useState } from "react";
import {
  minutesToMilliseconds,
  getCountingDownMinutesAndSeconds,
} from "../../../utils";
import "./Timer.css";
// Types
type Milliseconds = number;

const Timer = () => {
  const [time, setTime] = useState("");
  const [endTime, setEndTime] = useState<number>();
  const [isTimerStopped, setIsTimerStopped] = useState(true);
  const timeRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    function updateTimer() {
      const now = new Date().getTime();
      if (endTime) {
        const target = endTime - now > 0 ? endTime - now : 0;
        setIsTimerStopped(false);
        const countdownTimes = getCountingDownMinutesAndSeconds(target);
        if (target >= 0) {
          return setTime(
            `${countdownTimes.minutesPadded}:${countdownTimes.secondsPadded}`
          );
        }
        setTime("00:00");
        setIsTimerStopped(true);
      }
    }
    timeRef.current = setInterval(() => updateTimer(), 100);
  }, [endTime]);

  useEffect(() => {
    console.log(`isTimerStopped`, isTimerStopped);
  }, [isTimerStopped]);

  function getEndTimeInMs(minutes: number): Milliseconds {
    const startTimeInMs = new Date().getTime();
    const endTimeInMs = startTimeInMs + minutesToMilliseconds(minutes);
    return endTimeInMs;
  }

  function handleStart(timerDurationMinutes: number) {
    isTimerStopped && setEndTime(getEndTimeInMs(timerDurationMinutes));
  }
  function handleStop() {
    setIsTimerStopped(true);
    if (timeRef.current) {
      clearInterval(timeRef.current);
    }
  }

  return (
    <>
      <div className="timer">
        <div className="time">{time || <p>25:00</p>}</div>
        <div className="timer-control-buttons">
          <button className="start-button" onClick={() => handleStart(25)}>
            Start
          </button>
          <button className="stop-button" onClick={handleStop}>
            Stop
          </button>
        </div>
      </div>
    </>
  );
};

export default Timer;
