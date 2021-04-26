export const TIMER_STOPPED = "TIMER_STOPPED";
export const TIMER_RUNNING = "TIMER_RUNNING";
export const TIMER_TIME = "TIME";
export const END_TIME = "END_TIME";
export const TIMER_STOPPING_TIME = "TIMER_STOPPING_TIME";
export const TIMER_STATUS = "TIMER_STATUS";

export enum ITimerStatus {
  Work = "WORK",
  ShortBreak = "SHORT_BREAK",
  LongBreak = "LONG_BREAK",
}

export type ActionTypes =
  | { type: typeof TIMER_STOPPED }
  | { type: typeof TIMER_RUNNING }
  | { type: typeof TIMER_TIME; payload: string }
  | { type: typeof END_TIME; payload: number }
  | { type: typeof TIMER_STOPPING_TIME; payload: string | null }
  | { type: typeof TIMER_STATUS; payload: ITimerStatus };

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
export const timerTime = (data: string): ActionTypes => {
  return {
    type: TIMER_TIME,
    payload: data,
  };
};
export const timerEndTime = (data: number): ActionTypes => {
  return {
    type: END_TIME,
    payload: data,
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

export const timerStatus = (timerStatus: ITimerStatus): ActionTypes => {
  return {
    type: TIMER_STATUS,
    payload: timerStatus,
  };
};
