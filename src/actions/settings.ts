export const SET_VOLUME = "SET_VOLUME";
export const IS_STATIC_BACKGROUND = "IS_STATIC_BACKGROUND";
export const SET_SHORT_BREAK_DURATION = "SET_SHORT_BREAK_DURATION";
export const SET_LONG_BREAK_DURATION = "SET_LONG_BREAK_DURATION";

export type ActionTypes =
  | { type: typeof SET_VOLUME; payload: number }
  | { type: typeof IS_STATIC_BACKGROUND; payload: boolean }
  | { type: typeof SET_SHORT_BREAK_DURATION; payload: number }
  | { type: typeof SET_LONG_BREAK_DURATION; payload: number };

export const setVolume = (volume: number): ActionTypes => {
  return {
    type: SET_VOLUME,
    payload: volume,
  };
};
export const isStaticBackground = (selectedOption: boolean): ActionTypes => {
  return {
    type: IS_STATIC_BACKGROUND,
    payload: selectedOption,
  };
};
export const setShortBreakDuration = (minutes: number): ActionTypes => {
  return {
    type: SET_SHORT_BREAK_DURATION,
    payload: minutes,
  };
};
export const setLongBreakDuration = (minutes: number): ActionTypes => {
  return {
    type: SET_LONG_BREAK_DURATION,
    payload: minutes,
  };
};
