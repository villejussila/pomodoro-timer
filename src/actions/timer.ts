export const timerStopped = () => {
  return {
    type: "TIMER_STOPPED",
  };
};
export const timerRunning = () => {
  return {
    type: "TIMER_RUNNING",
  };
};
export const timerTime = (data: string) => {
  return {
    type: "TIME",
    payload: data,
  };
};
export const timerEndTime = (data: number) => {
  return {
    type: "END_TIME",
    payload: data,
  };
};
export const timerStoppingTime = (stoppedAtTime: string | null) => {
  return {
    type: "TIMER_STOP_TIME",
    payload: stoppedAtTime,
  };
};
