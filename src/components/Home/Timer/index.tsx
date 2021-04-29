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
  timerMode,
  ITimerMode,
  timerCompleted,
  timerNextMode,
} from "../../../actions/timer";
import {
  cycleCompleted,
  pomodoroCountIncrease,
  resetCompleted,
} from "../../../actions/pomodoroCompleted";
import Circle from "./Circle";

interface ReturnTypeTimerStartTime {
  minutes: number;
  time: string;
}

const Timer = () => {
  const timeRef = useRef<NodeJS.Timeout>();
  const resetRef = useRef<NodeJS.Timeout>();
  const timer = useAppSelector((state) => state.timerReducer);
  const pomodoro = useAppSelector((state) => state.pomodoroCompletedReducer);
  const dispatch = useAppDispatch();
  const [isMouseDown, setIsMouseDown] = useState(false);

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
  }, [timer.endTime, timer.timerMode, timer.isStopped, dispatch]);

  //Handles stopping timer and setting completed mode
  useEffect(() => {
    if (timer.isStopped && timer.time === "00:00") {
      // dispatch(
      //   timerCompleted({
      //     completedMode: timer.timerMode,
      //     isCompleted: true,
      //   })
      // );
      dispatch(timerNextMode());
      dispatch(timerStoppingTime(null));
    }
  }, [timer.isStopped, timer.time, dispatch]);

  // useEffect(() => {
  //   dispatch(timerStoppingTime(null));
  //   if (timer.timerCompleted.completedMode === ITimerMode.Work) {
  //     dispatch(pomodoroCountIncrease());
  //     console.log("increased");
  //   }
  // }, [timer.timerCompleted, dispatch]);

  // useEffect(() => {
  //   if (pomodoro.pomodoroCount === 4) {
  //     dispatch(cycleCompleted(true));
  //     console.log("CYCLE COMPLETED");
  //     //TODO: tell user cycle is completed before reseting         <-----------------------
  //   }
  // }, [pomodoro.pomodoroCount, dispatch]);

  //Sets timer to Work, short break or long break mode

  // useEffect(() => {
  //   if (timer.timerCompleted.completedMode === ITimerMode.Work) {
  //     if (pomodoro.cycleCompleted) {
  //       dispatch(timerMode(ITimerMode.LongBreak));
  //       return;
  //     }
  //     dispatch(timerMode(ITimerMode.ShortBreak));
  //     return;
  //   }
  //   if (timer.timerCompleted.completedMode === ITimerMode.ShortBreak) {
  //     console.log(
  //       `timer.timerCompleted.isCompleted`,
  //       timer.timerCompleted.isCompleted
  //     );
  //     if (!timer.timerCompleted.isCompleted) return;
  //     console.log("shortbreak");
  //     dispatch(timerMode(ITimerMode.Work));
  //     dispatch(
  //       timerCompleted({
  //         isCompleted: false,
  //         completedMode: ITimerMode.ShortBreak,
  //       })
  //     );
  //     dispatch(timerStopped());
  //     if (timeRef.current) {
  //       clearInterval(timeRef.current);
  //     }
  //     return;
  //   }
  //   if (timer.timerCompleted.completedMode === ITimerMode.LongBreak) {
  //     console.log(
  //       `timer.timerCompleted.isCompleted`,
  //       timer.timerCompleted.isCompleted
  //     );
  //     if (!timer.timerCompleted.isCompleted) return;
  //     console.log("longbreak");
  //     dispatch(timerMode(ITimerMode.Work));
  //     dispatch(
  //       timerCompleted({
  //         isCompleted: false,
  //         completedMode: ITimerMode.LongBreak,
  //       })
  //     );
  //     dispatch(timerStopped());
  //     if (timeRef.current) {
  //       clearInterval(timeRef.current);
  //     }
  //     return;
  //   }
  // }, [timer.timerCompleted, pomodoro.cycleCompleted, dispatch]);

  //Reset the whole timer when 4 pomodoros
  // useEffect(() => {
  //   if (!timer.timerMode) return;
  //   if (
  //     timer.timerMode === ITimerMode.LongBreak &&
  //     timer.timerCompleted.completedMode === ITimerMode.LongBreak
  //   ) {
  //     console.log("reset");
  //     //TODO: tell user cycle is completed before reseting         <-----------------------
  //     dispatch(resetCompleted());
  //   }
  // }, [timer.timerMode, timer.timerCompleted.completedMode, dispatch]);

  function handleClickStart(timerWorkOrBreak: ITimerMode) {
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

  useEffect(() => {
    console.log(`timer.timerMode`, timer.timerMode);
  }, [timer.timerMode]);

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
    dispatch(
      timerCompleted({
        completedMode: timer.timerMode,
        isCompleted: true,
      })
    );
    dispatch(timerStopped());
    if (timeRef.current) {
      clearInterval(timeRef.current);
    }
    dispatch(timerStoppingTime(null));
    // dispatch(timerMode(ITimerMode.ShortBreak));
    dispatch(timerNextMode());
  }
  function showWorkOrBreak() {
    switch (timer.timerMode) {
      case "WORK":
        return "Working mode";
      case "SHORT_BREAK":
        return "Time for a short break";
      case "LONG_BREAK":
        return "Four pomodoros completed, time for a longer break!";
    }
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
    console.log(`timer.timerCurrentModeIndex`, timer.timerNextModeIndex);
  }, [timer.timerNextModeIndex]);
  // DEBUG----------------------------------------------------------------
  return (
    <div className="Timer">
      <div
        className="timer-time"
        onClick={() => handleClickStart(timer.timerMode || ITimerMode.Work)}
        // onClick={() => handleClickStart(ITimerMode.ShortBreak)}
        onMouseDown={() => setIsMouseDown(true)}
        onMouseUp={() => setIsMouseDown(false)}
      >
        <div className="time">
          {timer.isStopped ? showCorrectTextOnTimer() : timer.time}
        </div>
      </div>
      {/* <button className="start-button">Start</button>
        <button className="stop-button">Stop</button> */}

      <Circle />
      {timer.timerMode ? (
        <>
          <button className="reset-button" onClick={() => handleResetTimer()}>
            <i className="fas fa-redo"></i>
          </button>
          <button className="skip-button" onClick={() => handleSkip()}>
            <i className="fas fa-forward"></i>
          </button>
        </>
      ) : null}
      <button onClick={() => dispatch(timerNextMode())}>Next timer mode</button>
      <div className="work-or-break">{showWorkOrBreak()}</div>
    </div>
  );
};

export default Timer;
