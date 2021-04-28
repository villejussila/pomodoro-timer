import { combineReducers } from "redux";
import timerReducer from "./timerReducer";
import pomodoroCompletedReducer from "./pomodoroCompletedReducer";

const rootReducer = combineReducers({
  timerReducer,
  pomodoroCompletedReducer,
});

export default rootReducer;
