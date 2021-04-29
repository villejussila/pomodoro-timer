import "./CompletedPomodoros.css";
import ProgressLine from "./ProgressLine";
import { useAppSelector, useAppDispatch } from "../../App/hooks";
import {
  pomodoroCountIncrease,
  updateProgresses,
} from "../../../actions/pomodoroCompleted";
import React, { useEffect, useState } from "react";
import { convertStringTimeToNumberFormat } from "../../../utils";
const CompletedPomodoros = () => {
  const timer = useAppSelector((state) => state.timerReducer);
  const pomodoro = useAppSelector((state) => state.pomodoroCompletedReducer);
  const [progressArr, setProgressArr] = useState<number[]>([]);

  type IProgressArray = number[];

  const dispatch = useAppDispatch();
  const progressArray: IProgressArray = [];

  useEffect(() => {
    if (timer.timerMode !== "WORK") return;
    const time = convertStringTimeToNumberFormat(timer.time);
    const pomodoroCountMultiplier = 4;
    // progressArray[pomodoro.pomodoroIndex] =
    //   100 - time * pomodoroCountMultiplier || 0;

    // console.log(progress);
  }, [timer.time, pomodoro.pomodoroCount, timer.timerMode, dispatch]);
  return (
    <div className="total-progress">
      {pomodoro.progresses.map((progress, index) => {
        return <ProgressLine key={index} progress={progress} />;
      })}
    </div>
  );
};

export default CompletedPomodoros;
