import { ActionReducer, ActionReducerMap, INIT, MetaReducer } from '@ngrx/store';

import { StoreFeatureKeys } from './feature-keys';
import { logout } from './actions/application.actions';
import { applicationReducer } from './reducers/application.reducer';
import { moodReducer } from './reducers/mood.reducer';
import { userReducer } from './reducers/user.reducer';
import { articleReducer } from './reducers/article.reducer';
import { themeReducer } from './reducers/theme.reducer';
import { feedbackReducer } from './reducers/feedback.reducer';

export const reducers: ActionReducerMap<any> = {
  [StoreFeatureKeys.APPLICATION]: applicationReducer,
  [StoreFeatureKeys.MOOD]: moodReducer,
  [StoreFeatureKeys.USER]: userReducer,
  [StoreFeatureKeys.ARTICLE]: articleReducer,
  [StoreFeatureKeys.THEME]: themeReducer,
  [StoreFeatureKeys.FEEDBACK]: feedbackReducer
};

const debugMeta = (reducer: ActionReducer<any>): ActionReducer<any> => {
  return (state, action) => {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
};

const logoutMeta = (reducer: ActionReducer<any>): ActionReducer<any> => {
  return (state, action) => {
    if (action.type === logout.type) {
      return reducer(undefined, { type: INIT });
    }

    return reducer(state, action);
  }
};

export const metaReducers: MetaReducer<any>[] = [logoutMeta];
