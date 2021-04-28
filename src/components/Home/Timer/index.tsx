import { useCallback, useEffect, useRef, useState } from "react";
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
import Circle from "./Circle";

const Timer = () => {
  const timeRef = useRef<NodeJS.Timeout>();
  const resetRef = useRef<NodeJS.Timeout>();
  const timer = useAppSelector((state) => state.timerReducer);
  const dispatch = useAppDispatch();
  const [isMouseDown, setIsMouseDown] = useState(false);

  interface ReturnTypeTimerStartTime {
    minutes: number;
    time: string;
  }
  const determineTimerStartTime = useCallback(
    (timerWorkOrBreak: ITimerStatus): ReturnTypeTimerStartTime => {
      switch (timerWorkOrBreak) {
        case ITimerStatus.Work:
          return { minutes: 25, time: "25:00" };
        case ITimerStatus.ShortBreak:
          return { minutes: 5, time: "05:00" };
        case ITimerStatus.LongBreak:
          return { minutes: 15, time: "15:00" };
        case ITimerStatus.TEST:
          return { minutes: 1, time: "01:00" };
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

  function handleClickStart(timerWorkOrBreak: ITimerStatus) {
    if (timer.stoppingTime && timer.isStopped) {
      continueTimer(timer.stoppingTime, timerWorkOrBreak);
      return;
    }
    if (timer.isStopped) {
      startTimer(timerWorkOrBreak);
      return;
    }
    if (!timer.isStopped) {
      stopTimer();
    }
  }

  function startTimer(timerWorkOrBreak: ITimerStatus) {
    const time = determineTimerStartTime(timerWorkOrBreak);
    dispatch(timerEndTime(getEndTimeInMs(time.minutes)));
    dispatch(timerRunning());
    dispatch(timerStatus(timerWorkOrBreak));
  }
  function stopTimer() {
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
  function handleResetTimer() {
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
  }
  function showWorkOrBreak() {
    switch (timer.timerStatus) {
      case "WORK":
        return "Working mode";
      case "SHORT_BREAK":
        return "Time for a short break";
      case "LONG_BREAK":
        return "Four pomodoros completed, time for a longer break!";
    }
  }
  return (
    <div className="Timer">
      <div
        className="timer-time"
        onClick={() => handleClickStart(ITimerStatus.Work)}
        onMouseDown={() => setIsMouseDown(true)}
        onMouseUp={() => setIsMouseDown(false)}
      >
        {/* <div className="work-or-break">{showWorkOrBreak()}</div> */}
        <div className="time">
          {timer.time === "25:00" ? "START" : timer.time}
        </div>
      </div>
      <div className="timer-control-buttons">
        {/* <button className="start-button">Start</button>
        <button className="stop-button">Stop</button> */}
      </div>
      <Circle />
      {timer.timerStatus ? (
        <>
          <button className="reset-button" onClick={() => handleResetTimer()}>
            <i className="fas fa-redo"></i>
          </button>
          <button className="skip-button">
            <i className="fas fa-forward"></i>
          </button>
        </>
      ) : null}
    </div>
  );
};

export default Timer;
