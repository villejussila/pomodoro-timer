export const POMODOROS_COMPLETED_COUNT_INCREASE =
  "POMODOROS_COMPLETED_COUNT_INCREASE";
export const RESET_COUNT = "RESET_COUNT";
export const POMODOROS_COMPLETED_COUNT = "POMODOROS_COMPLETED_COUNT";

export type ActionTypes =
  | { type: typeof POMODOROS_COMPLETED_COUNT_INCREASE }
  | { type: typeof RESET_COUNT }
  | { type: typeof POMODOROS_COMPLETED_COUNT };

export const pomodorosCompletedCount = (): ActionTypes => {
  return {
    type: POMODOROS_COMPLETED_COUNT,
  };
};
export const pomodorosCompletedCountIncrease = (): ActionTypes => {
  return {
    type: POMODOROS_COMPLETED_COUNT_INCREASE,
  };
};
export const resetCount = (): ActionTypes => {
  return {
    type: RESET_COUNT,
  };
};
