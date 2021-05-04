import {
  ActionTypes,
  POMODORO_COUNT,
  RESET_COMPLETED_POMODOROS,
  UPDATE_PROGRESSES,
  CYCLE_COMPLETED,
} from "../actions/pomodoroCompleted";

export interface IPomodoroState {
  pomodoroCount: number;
  progresses: number[];
  cycleCompleted: boolean;
}
const initialState: IPomodoroState = {
  pomodoroCount: 0,
  progresses: [0, 0, 0, 0],
  cycleCompleted: false,
};

const pomodoroCompletedReducer = (
  state = initialState,
  action: ActionTypes
): IPomodoroState => {
  switch (action.type) {
    case POMODORO_COUNT:
      return {
        ...state,
        pomodoroCount: action.payload,
      };
    case RESET_COMPLETED_POMODOROS:
      return initialState;

    case UPDATE_PROGRESSES:
      return {
        ...state,
        progresses: action.payload,
      };
    case CYCLE_COMPLETED:
      return {
        ...state,
        cycleCompleted: action.payload,
      };
    default:
      return state;
  }
};

export default pomodoroCompletedReducer;
