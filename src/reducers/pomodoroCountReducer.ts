import {
  ActionTypes,
  POMODOROS_COMPLETED_COUNT,
  POMODOROS_COMPLETED_COUNT_INCREASE,
  RESET_COUNT,
} from "../actions/pomodoroCount";

interface IPomodoroState {
  pomodoroCount: number;
}
const initialState: IPomodoroState = {
  pomodoroCount: 0,
};

const pomodoroCountReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case POMODOROS_COMPLETED_COUNT:
      return state.pomodoroCount;
    case POMODOROS_COMPLETED_COUNT_INCREASE:
      return {
        ...state,
        pomodoroCount: state.pomodoroCount + 1,
      };
    case RESET_COUNT:
      return initialState;
    default:
      return state;
  }
};

export default pomodoroCountReducer;
