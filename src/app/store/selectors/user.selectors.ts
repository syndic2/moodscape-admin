import { createFeatureSelector, createSelector } from '@ngrx/store';

import { StoreFeatureKeys } from '../feature-keys';
import { UserState } from '../states';

const selectUserFeature= createFeatureSelector<UserState>(StoreFeatureKeys.USER);

export const getUsers= createSelector(
  selectUserFeature,
  state => state.users
);

export const getUser= (props) => {
  return createSelector(
    getUsers,
    state => state.find(user => user.Id === props.Id)
  );
};
