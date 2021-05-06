import {
  TIMER_STOPPED,
  TIMER_RUNNING,
  TIMER_TIME,
  END_TIME,
  TIMER_STOPPING_TIME,
  TIMER_MODE,
  TIMER_NEXT_MODE,
  ITimerMode,
  ActionTypes,
  TIMER_INIT_REQUEST,
  HAS_USER_USED_TIMER,
  SHOW_TIMER,
} from "../actions/timer";

export interface ITimerState {
  isStopped: boolean;
  time: string;
  endTime: number | null;
  stoppingTime: string | null;
  timerMode: ITimerMode | null;
  timerModes: ITimerMode[];
  timerCurrentModeIndex: number;
  timerNextModeIndex: number;
  timerInit: boolean | null;
  hasUserUsedTimer: boolean;
  isShowTimer: boolean;
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
  timerCurrentModeIndex: 0,
  timerNextModeIndex: 1,
  timerInit: null,
  hasUserUsedTimer: false,
  isShowTimer: false,
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
        timerCurrentModeIndex: state.timerNextModeIndex,
        timerNextModeIndex: (state.timerNextModeIndex += 1) % 8,
        // timerMode: ITimerMode.TEST,
      };
    case TIMER_INIT_REQUEST:
      return {
        ...state,
        timerInit: action.payload,
        timerCurrentModeIndex: 0,
        timerNextModeIndex: 1,
      };
    case HAS_USER_USED_TIMER:
      return {
        ...state,
        hasUserUsedTimer: action.payload,
      };
    case SHOW_TIMER:
      return {
        ...state,
        isShowTimer: action.payload,
      };
    default:
      return state;
  }
};

export default timerReducer;
