export const POMODORO_COUNT = "POMODORO_COUNT";
export const RESET_COMPLETED_POMODOROS = "RESET_COMPLETED_POMODOROS";
export const UPDATE_PROGRESSES = "UPDATE_PROGRESSES";
export const CYCLE_COMPLETED = "CYCLE_COMPLETED";

export type ActionTypes =
  | { type: typeof POMODORO_COUNT; payload: number }
  | { type: typeof RESET_COMPLETED_POMODOROS }
  | { type: typeof UPDATE_PROGRESSES; payload: number[] }
  | { type: typeof CYCLE_COMPLETED; payload: boolean };

export const pomodoroCount = (count: number): ActionTypes => {
  return {
    type: POMODORO_COUNT,
    payload: count,
  };
};
export const resetCompletedPomodoros = (): ActionTypes => {
  return {
    type: RESET_COMPLETED_POMODOROS,
  };
};
export const updateProgresses = (progressData: number[]): ActionTypes => {
  return {
    type: UPDATE_PROGRESSES,
    payload: progressData,
  };
};
export const cycleCompleted = (isCompleted: boolean): ActionTypes => {
  return {
    type: CYCLE_COMPLETED,
    payload: isCompleted,
  };
};
