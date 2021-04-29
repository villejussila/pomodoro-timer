// import { AnyAction } from "redux";
import {
  TIMER_STOPPED,
  TIMER_RUNNING,
  TIMER_TIME,
  END_TIME,
  TIMER_STOPPING_TIME,
  TIMER_MODE,
  TIMER_NEXT_MODE,
  TIMER_COMPLETED,
  ITimerMode,
  ActionTypes,
  Completed,
} from "../actions/timer";

interface ITimerState {
  isStopped: boolean;
  time: string;
  endTime: number | null;
  stoppingTime: string | null;
  timerMode: ITimerMode | null;
  timerModes: ITimerMode[];
  timerNextModeIndex: number;
  timerCompleted: Completed;
}
const initialState: ITimerState = {
  isStopped: true,
  time: "25:00",
  endTime: null,
  stoppingTime: null,
  timerMode: null,
  timerModes: [
    ITimerMode.Work,
    ITimerMode.ShortBreak,
    ITimerMode.Work,
    ITimerMode.ShortBreak,
    ITimerMode.Work,
    ITimerMode.ShortBreak,
    ITimerMode.Work,
    ITimerMode.LongBreak,
  ],
  timerNextModeIndex: 1,
  timerCompleted: { completedMode: null, isCompleted: false },
};

const timerReducer = (
  state = initialState,
  action: ActionTypes
): ITimerState => {
  switch (action.type) {
    case TIMER_STOPPED:
      return {
        ...state,
        isStopped: true,
      };
    case TIMER_RUNNING:
      return {
        ...state,
        isStopped: false,
      };
    case TIMER_TIME:
      return {
        ...state,
        time: action.payload,
      };
    case END_TIME:
      return {
        ...state,
        endTime: action.payload,
      };
    case TIMER_STOPPING_TIME:
      return {
        ...state,
        stoppingTime: action.payload,
      };
    case TIMER_MODE:
      return {
        ...state,
        timerMode: action.payload,
      };
    case TIMER_NEXT_MODE:
      return {
        ...state,
        timerMode: state.timerModes[state.timerNextModeIndex],
        timerNextModeIndex: (state.timerNextModeIndex += 1) % 8,
        // timerMode: ITimerMode.TEST,
      };
    case TIMER_COMPLETED:
      return {
        ...state,
        timerCompleted: action.payload,
      };
    default:
      return state;
  }
};

export default timerReducer;
