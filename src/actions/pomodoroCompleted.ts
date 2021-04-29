export const POMODORO_COUNT_INCREASE = "POMODORO_COUNT_INCREASE";
export const RESET_COMPLETED = "RESET_COMPLETED";
export const UPDATE_PROGRESSES = "UPDATE_PROGRESSES";
export const CYCLE_COMPLETED = "CYCLE_COMPLETED";

export type ActionTypes =
  | { type: typeof POMODORO_COUNT_INCREASE }
  | { type: typeof RESET_COMPLETED }
  | { type: typeof UPDATE_PROGRESSES; payload: number }
  | { type: typeof CYCLE_COMPLETED; payload: boolean };

export const pomodoroCountIncrease = (): ActionTypes => {
  return {
    type: POMODORO_COUNT_INCREASE,
  };
};
export const resetCompleted = (): ActionTypes => {
  return {
    type: RESET_COMPLETED,
  };
};
export const updateProgresses = (progress: number): ActionTypes => {
  return {
    type: UPDATE_PROGRESSES,
    payload: progress,
  };
};
export const cycleCompleted = (isCompleted: boolean): ActionTypes => {
  return {
    type: CYCLE_COMPLETED,
    payload: isCompleted,
  };
};
