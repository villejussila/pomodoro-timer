import "./CompletedPomodoros.css";
import ProgressLine from "./ProgressLine";
import { useAppSelector, useAppDispatch } from "../../App/hooks";
import React, { useCallback, useEffect, useState } from "react";
import { convertStringTimeToNumberFormat } from "../../../utils";
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

  useEffect(() => {
    if (timer.timerMode !== "WORK") return;
    let time = convertStringTimeToNumberFormat(timer.time);
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
  }, [
    timer.time,
    timer.timerMode,
    timer.timerCurrentModeIndex,
    pomodoro.cycleCompleted,
    timer.isStopped,
    timer.stoppingTime,
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
