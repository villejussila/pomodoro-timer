export const TIMER_STOPPED = "TIMER_STOPPED";
export const TIMER_RUNNING = "TIMER_RUNNING";
export const TIMER_TIME = "TIME";
export const END_TIME = "END_TIME";
export const TIMER_STOPPING_TIME = "TIMER_STOPPING_TIME";
export const TIMER_MODE = "TIMER_MODE";
export const TIMER_NEXT_MODE = "TIMER_NEXT_MODE";

export enum ITimerMode {
  Work = "WORK",
  ShortBreak = "SHORT_BREAK",
  LongBreak = "LONG_BREAK",
  TEST = "TEST",
}

export type ActionTypes =
  | { type: typeof TIMER_STOPPED }
  | { type: typeof TIMER_RUNNING }
  | { type: typeof TIMER_TIME; payload: string }
  | { type: typeof END_TIME; payload: number }
  | { type: typeof TIMER_STOPPING_TIME; payload: string | null }
  | { type: typeof TIMER_MODE; payload: ITimerMode }
  | { type: typeof TIMER_NEXT_MODE };

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
export const timerTime = (countdownTime: string): ActionTypes => {
  return {
    type: TIMER_TIME,
    payload: countdownTime,
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

export const timerMode = (timerMode: ITimerMode): ActionTypes => {
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
