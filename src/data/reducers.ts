import { ActionTypes } from 'lib/constants';
import { AppState, CommonReducer } from './types';

export const appStateReducer: CommonReducer<AppState> = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.UPDATE_APP_STATE:
      return { ...state, ...payload };

    case ActionTypes.UPDATE_ACTIVE_DATA:
      return { ...state, activeData: payload };

    default:
      break;
  }
};
