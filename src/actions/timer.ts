export const TIMER_STOPPED = "TIMER_STOPPED";
export const TIMER_RUNNING = "TIMER_RUNNING";
export const TIMER_TIME = "TIME";
export const END_TIME = "END_TIME";
export const TIMER_STOPPING_TIME = "TIMER_STOPPING_TIME";
export const TIMER_MODE = "TIMER_MODE";
export const TIMER_NEXT_MODE = "TIMER_NEXT_MODE";
export const TIMER_INIT_REQUEST = "TIMER_INIT_REQUEST";
export const HAS_USER_USED_TIMER = "HAS_USER_USED_TIMER";
export const SHOW_TIMER = "SHOW_TIMER";

export enum ITimerMode {
  Work = "WORK",
  ShortBreak = "SHORT_BREAK",
  LongBreak = "LONG_BREAK",
  TEST = "TEST",
}
export type timeType = {
  timeStr: string;
  timeMs: number;
};
export type ActionTypes =
  | { type: typeof TIMER_STOPPED }
  | { type: typeof TIMER_RUNNING }
  | { type: typeof TIMER_TIME; payload: timeType }
  | { type: typeof END_TIME; payload: number }
  | { type: typeof TIMER_STOPPING_TIME; payload: string | null }
  | { type: typeof TIMER_MODE; payload: ITimerMode | null }
  | { type: typeof TIMER_NEXT_MODE }
  | { type: typeof TIMER_INIT_REQUEST; payload: boolean }
  | { type: typeof HAS_USER_USED_TIMER; payload: boolean }
  | { type: typeof SHOW_TIMER; payload: boolean };

export const timerStopped = (): ActionTypes => {
  return {
    type: TIMER_STOPPED,
  };
};
export const timerRunning = (): ActionTypes => {
  return {
    type: TIMER_RUNNING,
  };
};
export const timerTime = (time: timeType): ActionTypes => {
  return {
    type: TIMER_TIME,
    payload: time,
  };
};
export const timerEndTime = (timeMs: number): ActionTypes => {
  return {
    type: END_TIME,
    payload: timeMs,
  };
};
export const timerStoppingTime = (
  stoppedAtTime: string | null
): ActionTypes => {
  return {
    type: TIMER_STOPPING_TIME,
    payload: stoppedAtTime,
  };
};

export const timerMode = (timerMode: ITimerMode | null): ActionTypes => {
  return {
    type: TIMER_MODE,
    payload: timerMode,
  };
};
export const timerNextMode = (): ActionTypes => {
  return {
    type: TIMER_NEXT_MODE,
  };
};
export const timerInitRequest = (isInit: boolean): ActionTypes => {
  return {
    type: TIMER_INIT_REQUEST,
    payload: isInit,
  };
};
export const userUsedTimer = (hasUsed: boolean): ActionTypes => {
  return {
    type: HAS_USER_USED_TIMER,
    payload: hasUsed,
  };
};
export const showTimer = (show: boolean): ActionTypes => {
  return {
    type: SHOW_TIMER,
    payload: show,
  };
};
