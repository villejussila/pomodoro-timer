import React, { useEffect, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../App/hooks";
import {
  minutesToMilliseconds,
  getCountingDownMinutesAndSeconds,
  convertStringTimeToNumberFormat,
} from "../../../utils";
import "./Timer.css";
import {
  timerStopped,
  timerRunning,
  timerTime,
  timerEndTime,
  timerStoppingTime,
  timerStatus,
  ITimerStatus,
} from "../../../actions/timer";
// Types
type Milliseconds = number;

const Timer = () => {
  // const [time, setTime] = useState("");
  // const [endTime, setEndTime] = useState<number>();
  // const [isTimerStoppedOld, setIsTimerStoppedOld] = useState(true);
  const timeRef = useRef<NodeJS.Timeout>();
  const timer = useAppSelector((state) => state.timerReducer);
  const dispatch = useAppDispatch();
  const [isMouseDown, setIsMouseDown] = useState(false);
  let resetRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    function updateTimer() {
      const now = new Date().getTime();
      if (timer.endTime) {
        const target = timer.endTime - now > 0 ? timer.endTime - now : 0;
        const countdownTime = getCountingDownMinutesAndSeconds(target);
        if (target >= 0) {
          return dispatch(
            timerTime(
              `${countdownTime.minutesPadded}:${countdownTime.secondsPadded}`
            )
          );
        }
        dispatch(timerTime("00:00"));
        dispatch(timerStopped());
      }
    }
    timeRef.current = setInterval(() => updateTimer(), 100);
  }, [timer.endTime, dispatch]);

  function getEndTimeInMs(minutes: number): Milliseconds {
    const startTimeInMs = new Date().getTime();
    const endTimeInMs = startTimeInMs + minutesToMilliseconds(minutes);
    return endTimeInMs;
  }

  function handleStart(timerDurationMinutes: number) {
    if (timer.stoppingTime && timer.isStopped) {
      dispatch(
        timerEndTime(
          getEndTimeInMs(convertStringTimeToNumberFormat(timer.stoppingTime))
        )
      );
      dispatch(timerRunning());
      dispatch(timerStatus(ITimerStatus.Work));
      return;
    }
    if (timer.isStopped) {
      dispatch(timerEndTime(getEndTimeInMs(timerDurationMinutes)));
      dispatch(timerRunning());
      dispatch(timerStatus(ITimerStatus.Work));
    }
  }
  function handleStop() {
    dispatch(timerStopped());
    if (timeRef.current) {
      clearInterval(timeRef.current);
    }
    dispatch(timerStoppingTime(timer.time));
  }
  useEffect(() => {
    if (isMouseDown) {
      resetRef.current = setTimeout(() => {
        console.log("reset");
        dispatch(timerStopped());
        if (timeRef.current) {
          clearInterval(timeRef.current);
        }
        dispatch(timerStoppingTime(null));
        dispatch(timerTime("25:00"));
      }, 3000);
    } else {
      resetRef.current && clearTimeout(resetRef.current);
    }
  }, [isMouseDown, dispatch]);
  return (
    <>
      <div className="timer">
        <div className="time">{timer.time || <p>25:00</p>}</div>
        <div className="timer-control-buttons">
          <button className="start-button" onClick={() => handleStart(25)}>
            Start
          </button>
          <button
            className={/* isMouseDown ? "stop-button reset" : */ "stop-button"}
            onClick={handleStop}
            onMouseDown={() => setIsMouseDown(true)}
            onMouseUp={() => setIsMouseDown(false)}
          >
            Stop
          </button>
        </div>
      </div>
    </>
  );
};

export default Timer;
