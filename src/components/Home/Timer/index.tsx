import { useCallback, useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch } from "../../App/hooks";
import {
  getCountingDownMinutesAndSeconds,
  convertStringTimeToNumberFormat,
  getEndTimeInMs,
} from "../../../lib/utils";
import "./Timer.css";
import {
  timerStopped,
  timerRunning,
  timerTime,
  timerEndTime,
  timerStoppingTime,
  timerMode,
  ITimerMode,
  timerNextMode,
  timerInitRequest,
} from "../../../actions/timer";
import Circle from "./Circle";
import {
  updateProgresses,
  resetCompletedPomodoros,
} from "../../../actions/pomodoroCompleted";
// @ts-ignore
import alarm from "../../../sounds/alarm.wav";

interface ReturnTypeTimerStartTime {
  minutes: number;
  time: string;
}

const Timer = () => {
  const timeRef = useRef<NodeJS.Timeout>();
  const timer = useAppSelector((state) => state.timerReducer);
  const alarmSound = new Audio(alarm);
  const pomodoro = useAppSelector((state) => state.pomodoroCompletedReducer);
  const dispatch = useAppDispatch();

  const determineTimerStartTime = useCallback(
    (timerWorkOrBreak: ITimerMode): ReturnTypeTimerStartTime => {
      switch (timerWorkOrBreak) {
        case ITimerMode.Work:
          return { minutes: 0.333333, time: "00:20" };
        case ITimerMode.ShortBreak:
          return { minutes: 0.1, time: "00:06" };
        case ITimerMode.LongBreak:
          return { minutes: 0.25, time: "00:25" };
        case ITimerMode.TEST:
          return { minutes: 1, time: "01:00" };
        default:
          return { minutes: 25, time: "25:00" };
      }
    },
    []
  );

  //FIX: completed progress lines are really annoying on wider screen because it doesn't fill up entirely
  //TODO: add volume control to settings and add settings
  //TODO: make responsive

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
        alarmSound.volume = 0.75;
        alarmSound.play();
      }
    }
    timeRef.current = setInterval(() => updateTimer(), 100);
    // eslint-disable-next-line
  }, [timer.endTime, timer.timerMode, timer.isStopped, dispatch]);

  //Handle stopping timer and setting next mode
  useEffect(() => {
    if (timer.isStopped && timer.time === "00:00") {
      dispatch(timerNextMode());
      //FIX: on page refresh this sets timer on next mode (because ls has values isStopped true and timer.time = 00:00)
      //EDIT: FIXED but now UI needs to get correct info to show the progress circle
      dispatch(timerStoppingTime(null));
      dispatch(timerTime("25:00"));
    }
  }, [timer.isStopped, timer.time, dispatch]);

  // initialize
  useEffect(() => {
    if (!timer.timerInit) return;
    dispatch(timerStopped());
    timeRef.current && clearInterval(timeRef.current);
    dispatch(timerStoppingTime(null));
    dispatch(timerInitRequest(false));
    dispatch(resetCompletedPomodoros());
    dispatch(timerMode(null));
  }, [timer.timerInit, dispatch]);

  //Logging
  useEffect(() => {
    console.log(`timer.timerMode`, timer.timerMode);
  }, [timer.timerMode]);

  function handleClickTimer(timerWorkOrBreak: ITimerMode) {
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

  function startTimer(timerWorkOrBreak: ITimerMode) {
    const time = determineTimerStartTime(timerWorkOrBreak);
    dispatch(timerEndTime(getEndTimeInMs(time.minutes)));
    dispatch(timerRunning());
    dispatch(timerMode(timerWorkOrBreak));
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
    timerWorkOrBreak: ITimerMode
  ) {
    dispatch(
      timerEndTime(
        getEndTimeInMs(convertStringTimeToNumberFormat(timerStoppingTime))
      )
    );
    dispatch(timerRunning());
    dispatch(timerMode(timerWorkOrBreak));
  }

  function handleResetTimer() {
    console.log("reset");
    dispatch(timerStopped());
    if (timeRef.current) {
      clearInterval(timeRef.current);
    }
    dispatch(timerStoppingTime(null));
    if (timer.timerMode) {
      const { time } = determineTimerStartTime(timer.timerMode);
      dispatch(timerTime(time));
    }
  }

  function handleSkip() {
    dispatch(timerStopped());
    if (timeRef.current) {
      clearInterval(timeRef.current);
    }
    dispatch(timerStoppingTime(null));
    dispatch(timerNextMode());
    completePomodoroOnSkip();
  }

  function completePomodoroOnSkip() {
    if (timer.timerNextModeIndex === 0) {
      dispatch(updateProgresses([0, 0, 0, 0]));
      return;
    }
    let updatedPomodoroProgresses: number[] = [];
    pomodoro.progresses.forEach((val) => {
      if (val === 0 || val === 100) updatedPomodoroProgresses.push(val);
      else updatedPomodoroProgresses.push(100);
    });
    dispatch(updateProgresses(updatedPomodoroProgresses));
  }

  function showCorrectTextOnTimer() {
    if (!timer.timerMode) return "START";
    switch (timer.timerMode) {
      case ITimerMode.Work:
        return "WORK";
      case ITimerMode.ShortBreak:
        return "BREAK";
      case ITimerMode.LongBreak:
        return "BREAK";
      default:
        return "START";
    }
  }
  // DEBUG-----------------------------------------------------------------
  useEffect(() => {
    console.log(`timer.timerNextModeIndex`, timer.timerNextModeIndex);
  }, [timer.timerNextModeIndex]);
  // DEBUG----------------------------------------------------------------
  return (
    <div className="Timer">
      <div
        className="timer-time"
        onClick={() => handleClickTimer(timer.timerMode || ITimerMode.Work)}
      >
        <div className="time">
          {timer.isStopped && !timer.stoppingTime
            ? showCorrectTextOnTimer()
            : timer.time}
        </div>
      </div>
      {timer.timerMode ? (
        <>
        <Circle />
          {/* <div className="paused">
            <i className="fas fa-pause"></i>
          </div> */}
          <button className="reset-button" onClick={() => handleResetTimer()}>
            <i className="fas fa-redo"></i>
          </button>
          <button className="skip-button" onClick={() => handleSkip()}>
            <i className="fas fa-forward"></i>
          </button>
        </>
      ) : null}
      {/* <button onClick={() => dispatch(timerNextMode())}>Next timer mode</button> */}
      {/* <div className="work-or-break">{showWorkOrBreak()}</div> */}
    </div>
  );
};

export default Timer;
