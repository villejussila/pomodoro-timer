import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";
import { saveState, loadState } from "./lib/localStorage";
import { composeWithDevTools } from "redux-devtools-extension";
import throttle from "lodash/throttle";

const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25 });
const persistedState = loadState();
const store = createStore(
  rootReducer,
  persistedState,
  composeEnhancers(applyMiddleware(thunk))
);

store.subscribe(
  throttle(() => {
    saveState({
      timerReducer: store.getState().timerReducer,
      pomodoroCompletedReducer: store.getState().pomodoroCompletedReducer,
    });
  }, 1000)
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
