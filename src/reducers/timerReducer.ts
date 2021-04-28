// import { AnyAction } from "redux";
import {
  TIMER_STOPPED,
  TIMER_RUNNING,
  TIMER_TIME,
  END_TIME,
  TIMER_STOPPING_TIME,
  TIMER_STATUS,
  TIMER_COMPLETED,
  ITimerStatus,
  ActionTypes,
  Completed,
} from "../actions/timer";

interface ITimerState {
  isStopped: boolean;
  time: string;
  endTime: number | null;
  stoppingTime: string | null;
  timerStatus: ITimerStatus | null;
  timerCompleted: Completed;
}
const initialState: ITimerState = {
  isStopped: true,
  time: "25:00",
  endTime: null,
  stoppingTime: null,
  timerStatus: null,
  timerCompleted: { completedType: null, isCompleted: false },
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
    case TIMER_STATUS:
      return {
        ...state,
        timerStatus: action.payload,
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
