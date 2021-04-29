import {
  ActionTypes,
  POMODORO_COUNT_INCREASE,
  RESET_COMPLETED,
  UPDATE_PROGRESSES,
  CYCLE_COMPLETED,
} from "../actions/pomodoroCompleted";

interface IPomodoroState {
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
    case POMODORO_COUNT_INCREASE:
      return {
        ...state,
        pomodoroCount: state.pomodoroCount + 1,
      };
    case RESET_COMPLETED:
      return initialState;

    case UPDATE_PROGRESSES:
      return {
        ...state,
        progresses: [...state.progresses, action.payload],
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
