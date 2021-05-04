// Types
type Milliseconds = number;

interface CountingDownMinutesAndSeconds {
  minutes: number;
  seconds: number;
  minutesPadded: string;
  secondsPadded: string;
}
export function minutesToMilliseconds(minutes: number) {
  return minutes * 1000 * 60;
}
export function getCountingDownMinutesAndSeconds(
  targetTime: number
): CountingDownMinutesAndSeconds {
  const minutes = Math.floor((targetTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((targetTime % (1000 * 60)) / 1000);
  const minutesPadded = minutes.toString().padStart(2, "0");
  const secondsPadded = seconds.toString().padStart(2, "0");
  return {
    minutes,
    seconds,
    minutesPadded,
    secondsPadded,
  };
}
export function convertStringTimeToNumberFormat(time: string) {
  const times = time.split(":");
  const minutes = Number(times[0]);
  const seconds = Number(times[1]) / 60;
  return minutes + seconds;
}
export function getEndTimeInMs(minutes: number): Milliseconds {
  const startTimeInMs = new Date().getTime();
  const endTimeInMs = startTimeInMs + minutesToMilliseconds(minutes);
  return endTimeInMs;
}
