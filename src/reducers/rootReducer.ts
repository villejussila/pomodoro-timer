import { combineReducers } from "redux";
import timerReducer from "./timerReducer";
import pomodoroCountReducer from "./pomodoroCountReducer";

const rootReducer = combineReducers({
  timerReducer,
  pomodoroCountReducer,
});

export default rootReducer;
