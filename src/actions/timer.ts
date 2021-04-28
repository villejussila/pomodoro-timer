export const TIMER_STOPPED = "TIMER_STOPPED";
export const TIMER_RUNNING = "TIMER_RUNNING";
export const TIMER_TIME = "TIME";
export const END_TIME = "END_TIME";
export const TIMER_STOPPING_TIME = "TIMER_STOPPING_TIME";
export const TIMER_STATUS = "TIMER_STATUS";
export const TIMER_COMPLETED = "TIMER_COMPLETED";

export enum ITimerStatus {
  Work = "WORK",
  ShortBreak = "SHORT_BREAK",
  LongBreak = "LONG_BREAK",
  TEST = "TEST",
}

export type Completed = {
  completedType: ITimerStatus | null;
  isCompleted: boolean;
};

export type ActionTypes =
  | { type: typeof TIMER_STOPPED }
  | { type: typeof TIMER_RUNNING }
  | { type: typeof TIMER_TIME; payload: string }
  | { type: typeof END_TIME; payload: number }
  | { type: typeof TIMER_STOPPING_TIME; payload: string | null }
  | { type: typeof TIMER_STATUS; payload: ITimerStatus }
  | { type: typeof TIMER_COMPLETED; payload: Completed };

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

export const timerStatus = (timerStatus: ITimerStatus): ActionTypes => {
  return {
    type: TIMER_STATUS,
    payload: timerStatus,
  };
};
export const timerCompleted = (completed: Completed): ActionTypes => {
  return {
    type: TIMER_COMPLETED,
    payload: completed,
  };
};
