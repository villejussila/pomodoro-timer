import {
  ActionTypes,
  POMODORO_INDEX,
  POMODORO_INDEX_INCREASE,
  POMODORO_PROGRESSES,
  RESET_COMPLETED,
  UPDATE_PROGRESSES,
} from "../actions/pomodoroCompleted";

interface IPomodoroState {
  pomodoroIndex: number;
  progresses: number[];
  cycleCompleted: boolean;
}
const initialState: IPomodoroState = {
  pomodoroIndex: 0,
  progresses: [0, 0, 0, 0],
  cycleCompleted: false,
};

const pomodoroCompletedReducer = (
  state = initialState,
  action: ActionTypes
): IPomodoroState => {
  switch (action.type) {
    case POMODORO_INDEX:
      return {
        ...state
      }
    case POMODORO_INDEX_INCREASE:
      return {
        ...state,
        pomodoroIndex: (state.pomodoroIndex + 1) % 4,
      };
    case RESET_COMPLETED:
      return initialState;
    case POMODORO_PROGRESSES:
      return {
        ...state
      }

    case UPDATE_PROGRESSES:
      return {
        ...state,
        progresses: action.payload,
      };
    default:
      return state;
  }
};

export default pomodoroCompletedReducer;
