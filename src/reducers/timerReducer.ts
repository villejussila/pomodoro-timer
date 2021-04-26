import { AnyAction } from "redux";

export interface timerState {
  isStopped: boolean;
  time: string;
  endTime: number | null;
  stoppingTime: string | null;
}
const initialState: timerState = {
  isStopped: true,
  time: "",
  endTime: null,
  stoppingTime: null,
};

const timerReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case "TIMER_STOPPED":
      return {
        ...state,
        isStopped: true,
      };
    case "TIMER_RUNNING":
      return {
        ...state,
        isStopped: false,
      };
    case "TIME":
      return {
        ...state,
        time: action.payload,
      };
    case "END_TIME":
      return {
        ...state,
        endTime: action.payload,
      };
    case "TIMER_STOP_TIME":
      return {
        ...state,
        stoppingTime: action.payload,
      };
    default:
      return state;
  }
};

export default timerReducer;
