import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../App/hooks";
import {
  getCountingDownMinutesAndSeconds,
  convertStringTimeToNumberFormat,
  getEndTimeInMs,
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
  timerCompleted,
} from "../../../actions/timer";

const Timer = () => {
  const timeRef = useRef<NodeJS.Timeout>();
  const resetRef = useRef<NodeJS.Timeout>();
  const timer = useAppSelector((state) => state.timerReducer);
  const dispatch = useAppDispatch();
  const [isMouseDown, setIsMouseDown] = useState(false);

  interface ReturnTimerStartTime {
    minutes: number;
    time: string;
  }
  const determineTimerStartTime = useCallback(
    (timerWorkOrBreak: ITimerStatus): ReturnTimerStartTime => {
      switch (timerWorkOrBreak) {
        case ITimerStatus.Work:
          return { minutes: 25, time: "25:00" };
        case ITimerStatus.ShortBreak:
          return { minutes: 5, time: "05:00" };
        case ITimerStatus.LongBreak:
          return { minutes: 15, time: "15:00" };
        default:
          return { minutes: 25, time: "25:00" };
      }
    },
    []
  );

  //Updating timer
  useEffect(() => {
    function updateTimer() {
      if (timer.isStopped) return;
      const now = new Date().getTime();
      if (timer.endTime) {
        const target = timer.endTime - now > 0 ? timer.endTime - now : 0;
        const countdownTime = getCountingDownMinutesAndSeconds(target);
        if (target > 0) {
          return dispatch(
            timerTime(
              `${countdownTime.minutesPadded}:${countdownTime.secondsPadded}`
            )
          );
        }
        timeRef.current && clearInterval(timeRef.current);
        dispatch(timerTime("00:00"));
        dispatch(timerStopped());
      }
    }
    timeRef.current = setInterval(() => updateTimer(), 100);
  }, [timer.endTime, timer.timerStatus, timer.isStopped, dispatch]);

  useEffect(() => {
    if (timer.isStopped && timer.time === "00:00") {
      dispatch(
        timerCompleted({
          completedType: timer.timerStatus,
          isCompleted: true,
        })
      );
    }
  }, [timer.isStopped, timer.time, timer.timerStatus, dispatch]);
  //Reset timer
  useEffect(() => {
    if (isMouseDown) {
      resetRef.current = setTimeout(() => {
        console.log("reset");
        dispatch(timerStopped());
        if (timeRef.current) {
          clearInterval(timeRef.current);
        }
        dispatch(timerStoppingTime(null));
        if (timer.timerStatus) {
          const { time } = determineTimerStartTime(timer.timerStatus);
          dispatch(timerTime(time));
        }
      }, 2000);
    } else {
      resetRef.current && clearTimeout(resetRef.current);
    }
  }, [isMouseDown, timer.timerStatus, determineTimerStartTime, dispatch]);

  function handleStart(timerWorkOrBreak: ITimerStatus) {
    //Starting
    if (timer.isStopped) {
      const time = determineTimerStartTime(timerWorkOrBreak);
      dispatch(timerEndTime(getEndTimeInMs(time.minutes)));
      dispatch(timerRunning());
      dispatch(timerStatus(timerWorkOrBreak));
    }
    //Continuing
    if (timer.stoppingTime && timer.isStopped) {
      continueTimer(timer.stoppingTime, timerWorkOrBreak);
      return;
    }
  }
  function handleStop() {
    dispatch(timerStopped());
    if (timeRef.current) {
      clearInterval(timeRef.current);
    }
    dispatch(timerStoppingTime(timer.time));
  }

  function continueTimer(
    timerStoppingTime: string,
    timerWorkOrBreak: ITimerStatus
  ) {
    dispatch(
      timerEndTime(
        getEndTimeInMs(convertStringTimeToNumberFormat(timerStoppingTime))
      )
    );
    dispatch(timerRunning());
    dispatch(timerStatus(timerWorkOrBreak));
  }

  return (
    <>
      <div className="timer">
        <div className="time">{timer.time}</div>
        <div className="timer-control-buttons">
          <button
            className="start-button"
            onClick={() => handleStart(ITimerStatus.Work)}
          >
            Start
          </button>
          <button
            className={"stop-button"}
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
