export const POMODORO_INDEX_INCREASE = "POMODORO_INDEX_INCREASE";
export const RESET_COMPLETED = "RESET_COMPLETED";
export const POMODORO_INDEX = "POMODORO_INDEX";
export const POMODORO_PROGRESSES = "POMODORO_PROGRESSES";
export const UPDATE_PROGRESSES = "UPDATE_PROGRESSES";

export type ActionTypes =
  | { type: typeof POMODORO_INDEX_INCREASE }
  | { type: typeof RESET_COMPLETED }
  | { type: typeof POMODORO_INDEX }
  | { type: typeof POMODORO_PROGRESSES }
  | { type: typeof UPDATE_PROGRESSES; payload: number[] };

export const pomodoroIndex = (): ActionTypes => {
  return {
    type: POMODORO_INDEX,
  };
};
export const pomodoroIndexIncrease = (): ActionTypes => {
  return {
    type: POMODORO_INDEX_INCREASE,
  };
};
export const resetCompleted = (): ActionTypes => {
  return {
    type: RESET_COMPLETED,
  };
};
export const pomodoroProgresses = (): ActionTypes => {
  return {
    type: POMODORO_PROGRESSES,
  };
};
export const updateProgresses = (progresses: number[]): ActionTypes => {
  return {
    type: UPDATE_PROGRESSES,
    payload: progresses,
  };
};
