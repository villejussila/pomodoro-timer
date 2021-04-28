import "./CompletedPomodoros.css";
import ProgressLine from "./ProgressLine";
import { useAppSelector, useAppDispatch } from "../../App/hooks";
import {
  pomodoroIndex,
  pomodoroIndexIncrease,
  pomodoroProgresses,
  updateProgresses,
} from "../../../actions/pomodoroCompleted";
import { useEffect } from "react";
import { convertStringTimeToNumberFormat } from "../../../utils";
const CompletedPomodoros = () => {
  const timer = useAppSelector((state) => state.timerReducer);
  const pomodoro = useAppSelector((state) => state.pomodoroCompletedReducer);
  const dispatch = useAppDispatch();
  useEffect(() => {
    let time = convertStringTimeToNumberFormat(timer.time);
    let multiplier = 4;
    const progressArray: [number, number, number, number] = [0, 0, 0, 0];
    progressArray[pomodoro.pomodoroIndex] = 100 - time * multiplier || 0;
    dispatch(updateProgresses(progressArray));
    // console.log(progress);
  }, [timer.time, pomodoro.pomodoroIndex, dispatch]);
  // console.log(pomodoro.progresses);
  return (
    <div className="total-progress">
      {pomodoro.progresses.map((progress, index) => {
        return <ProgressLine key={index} progress={progress} />;
      })}
    </div>
  );
};

export default CompletedPomodoros;
