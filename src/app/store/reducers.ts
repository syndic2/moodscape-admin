import { ActionReducer, ActionReducerMap, INIT, MetaReducer } from '@ngrx/store';

import { StoreFeatureKeys } from './feature-keys';
import { applicationReducer } from './reducers/application.reducer';
import { articleReducer } from './reducers/article.reducer';

export const reducers: ActionReducerMap<any>= {
  [StoreFeatureKeys.APPLICATION]: applicationReducer,
  [StoreFeatureKeys.ARTICLE]: articleReducer
};

const debugMeta= (reducer: ActionReducer<any>): ActionReducer<any> => {
  return (state, action) => {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
};

const logoutMeta= (reducer: ActionReducer<any>): ActionReducer<any> => {
  return (state, action) => {
    //if (action.type === logout.type) {
    //  return reducer(undefined, { type: INIT });
    //}

    return reducer(state, action);
  }
};

export const metaReducers: MetaReducer<any>[]= [logoutMeta];
