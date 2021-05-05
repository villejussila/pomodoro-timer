import { combineReducers } from "redux";
import timerReducer from "./timerReducer";
import pomodoroCompletedReducer from "./pomodoroCompletedReducer";
import settingsReducer from "./settingsReducer";

const rootReducer = combineReducers({
  timerReducer,
  pomodoroCompletedReducer,
  settingsReducer,
});

export default rootReducer;
