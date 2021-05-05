import {
  SET_VOLUME,
  IS_STATIC_BACKGROUND,
  SET_SHORT_BREAK_DURATION,
  SET_LONG_BREAK_DURATION,
  ActionTypes,
} from "../actions/settings";

export interface ISettingsState {
  volume: number;
  staticBackground: boolean;
  shortBreakDuration: number;
  longBreakDuration: number;
}

const initialState: ISettingsState = {
  volume: 0.75,
  staticBackground: false,
  shortBreakDuration: 5,
  longBreakDuration: 15,
};

const settingsReducer = (
  state = initialState,
  action: ActionTypes
): ISettingsState => {
  switch (action.type) {
    case SET_VOLUME:
      return {
        ...state,
        volume: action.payload,
      };
    case IS_STATIC_BACKGROUND:
      return {
        ...state,
        staticBackground: action.payload,
      };
    case SET_SHORT_BREAK_DURATION:
      return {
        ...state,
        shortBreakDuration:
          action.payload >= 1 && action.payload <= 15 ? action.payload : 5,
      };
    case SET_LONG_BREAK_DURATION:
      return {
        ...state,
        longBreakDuration:
          action.payload >= 1 && action.payload <= 60 ? action.payload : 15,
      };
    default:
      return state;
  }
};

export default settingsReducer;
