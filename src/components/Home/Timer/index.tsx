import { useCallback, useEffect, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../App/hooks";
import {
  getCountingDownMinutesAndSeconds,
  convertStringTimeToNumberFormat,
  convertMinutesToStringTimeFormat,
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
  userUsedTimer,
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
const alarmSound = new Audio(alarm);

const Timer = () => {
  const timeRef = useRef<NodeJS.Timeout>();
  const timer = useAppSelector((state) => state.timerReducer);
  const pomodoro = useAppSelector((state) => state.pomodoroCompletedReducer);
  const settings = useAppSelector((state) => state.settingsReducer);
  const dispatch = useAppDispatch();
  const [isTimeClicked, setIsTimeClicked] = useState<boolean | null>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const determineTimerStartTime = useCallback(
    (timerWorkOrBreak: ITimerMode): ReturnTypeTimerStartTime => {
      switch (timerWorkOrBreak) {
        case ITimerMode.Work:
          return { minutes: 25, time: "25:00" };
        case ITimerMode.ShortBreak:
          return {
            minutes: settings.shortBreakDuration,
            time: convertMinutesToStringTimeFormat(settings.shortBreakDuration),
          };
        case ITimerMode.LongBreak:
          return {
            minutes: settings.longBreakDuration,
            time: convertMinutesToStringTimeFormat(settings.longBreakDuration),
          };
        case ITimerMode.TEST:
          return { minutes: 0.1, time: "00:06" };
        default:
          return { minutes: 25, time: "25:00" };
      }
    },
    [settings.shortBreakDuration, settings.longBreakDuration]
  );
  useEffect(() => {
    function updateTimer() {
      if (timer.isStopped) return;
      const now = new Date().getTime();
      if (timer.endTime) {
        const target = timer.endTime - now > 0 ? timer.endTime - now : 0;
        const countdownTime = getCountingDownMinutesAndSeconds(target);
        if (target > 0) {
          dispatch(
            timerTime({
              timeStr: `${countdownTime.minutesPadded}:${countdownTime.secondsPadded}`,
              timeMs: countdownTime.time,
            })
          );
          setIsLoading(false);
          return;
        }
        timeRef.current && clearInterval(timeRef.current);
        dispatch(timerTime({ timeStr: "00:00", timeMs: 0 }));
        dispatch(timerStopped());
        alarmSound.volume = settings.volume;
        alarmSound.play();
      }
    }
    timeRef.current = setInterval(() => updateTimer(), 250);
    return () => {
      timeRef.current && clearInterval(timeRef.current);
    };
    // eslint-disable-next-line
  }, [timer.endTime, timer.timerMode, timer.isStopped, dispatch]);

  useEffect(() => {
    if (timer.isStopped && timer.time.timeStr === "00:00") {
      dispatch(timerNextMode());
      dispatch(timerStoppingTime(null));
      dispatch(timerTime({ timeStr: "25:00", timeMs: 1500000 }));
    }
  }, [timer.isStopped, timer.time, dispatch]);

  useEffect(() => {
    if (timer.stoppingTime && timer.isStopped) {
      setIsTimeClicked(false);
    }
    return () => {
      setIsTimeClicked(true);
    };
  }, [timer.stoppingTime, timer.isStopped, dispatch]);

  // initialize timer
  useEffect(() => {
    if (!timer.timerInit) return;
    dispatch(timerStopped());
    timeRef.current && clearInterval(timeRef.current);
    dispatch(timerStoppingTime(null));
    dispatch(timerInitRequest(false));
    dispatch(resetCompletedPomodoros());
    dispatch(timerMode(null));
  }, [timer.timerInit, dispatch]);

  useEffect(() => {
    console.log(`isLoading`, isLoading);
  }, [isLoading]);

  function handleClickTimer(timerWorkOrBreak: ITimerMode) {
    setIsLoading(true);
    dispatch(userUsedTimer(true));
    if (timer.stoppingTime && timer.isStopped) {
      setIsLoading(false);
      continueTimer(timer.stoppingTime, timerWorkOrBreak);
      return;
    }
    if (timer.isStopped) {
      startTimer(timerWorkOrBreak);
      return;
    }
    if (!timer.isStopped) {
      setIsLoading(false);
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
    dispatch(timerStoppingTime(timer.time.timeStr));
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
      const { time, minutes } = determineTimerStartTime(timer.timerMode);
      dispatch(timerTime({ timeStr: time, timeMs: minutes * 60000 }));
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

  return (
    <div className="Timer">
      <div
        className="timer-time"
        onClick={() => handleClickTimer(timer.timerMode || ITimerMode.Work)}
      >
        <div className={isTimeClicked ? "time continue" : "time paused"}>
          {timer.isStopped && !timer.stoppingTime
            ? showCorrectTextOnTimer()
            : !isLoading
            ? timer.time.timeStr
            : ":"}
        </div>
      </div>
      {timer.timerMode ? (
        <>
          <Circle />
          <button className="reset-button" onClick={() => handleResetTimer()}>
            <i className="fas fa-redo"></i>
          </button>
          <button className="skip-button" onClick={() => handleSkip()}>
            <i className="fas fa-forward"></i>
          </button>
        </>
      ) : null}
    </div>
  );
};

export default Timer;
