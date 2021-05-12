import "./CompletedPomodoros.css";
import ProgressLine from "./ProgressLine";
import { useAppSelector, useAppDispatch } from "../../App/hooks";
import React, { useCallback, useEffect, useRef } from "react";
import {
  cycleCompleted,
  pomodoroCount,
  updateProgresses,
} from "../../../actions/pomodoroCompleted";
const CompletedPomodoros = () => {
  const timer = useAppSelector((state) => state.timerReducer);
  const pomodoro = useAppSelector((state) => state.pomodoroCompletedReducer);

  const dispatch = useAppDispatch();

  const getUpdatedProgressArray = useCallback(
    (progressCalculated: number, currentProgressIndex: number): number[] => {
      let arr = [0, 0, 0, 0];
      if (currentProgressIndex > 0 && currentProgressIndex < 4) {
        for (let i = 0; i < currentProgressIndex; i++) {
          arr[i] = 100;
        }
        arr[currentProgressIndex] = progressCalculated;
        if (arr === [100, 100, 100, 100]) dispatch(cycleCompleted(true));
      } else {
        if (pomodoro.cycleCompleted) arr = [0, 0, 0, 0];
        arr[currentProgressIndex] = progressCalculated;
      }
      return arr;
    },
    [pomodoro.cycleCompleted, dispatch]
  );

  //Updating progress only once a second for better performance
  const latestRef = useRef<string>();
  useEffect(() => {
    if (timer.timerMode !== "WORK") return;
    if (!latestRef.current || latestRef.current !== timer.time.timeStr) {
      let latest = timer.time.timeStr;
      let time = timer.time.timeMs / 60000;
      const pomodoroCountMultiplier = 4;
      const progressCalculated = 100 - time * pomodoroCountMultiplier || 0;
      const currentProgressIndex = timer.timerCurrentModeIndex / 2;
      dispatch(pomodoroCount(currentProgressIndex));
      if (!timer.isStopped) {
        dispatch(
          updateProgresses(
            getUpdatedProgressArray(progressCalculated, currentProgressIndex)
          )
        );
      }
      latestRef.current = latest;
    }
  }, [
    timer.time,
    timer.timerMode,
    timer.timerCurrentModeIndex,
    timer.isStopped,
    getUpdatedProgressArray,
    dispatch,
  ]);

  return (
    <div className="total-progress">
      {pomodoro.progresses.map((progress, index) => {
        return <ProgressLine key={index} progress={progress} />;
      })}
    </div>
  );
};

export default CompletedPomodoros;
