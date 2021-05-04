import { ITimerState } from "../reducers/timerReducer";
import { IPomodoroState } from "../reducers/pomodoroCompletedReducer";
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("timer");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};
type LocalStorageStateTypes =
  | { timerReducer: ITimerState }
  | { pomodoroCompletedReducer: IPomodoroState };
export const saveState = (state: LocalStorageStateTypes) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("timer", serializedState);
  } catch (err) {
    console.log(err);
  }
};
