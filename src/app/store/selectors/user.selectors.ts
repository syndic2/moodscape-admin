import { createFeatureSelector, createSelector } from '@ngrx/store';

import { StoreFeatureKeys } from '../feature-keys';
import { UserState } from '../states';

const selectUserFeature= createFeatureSelector<UserState>(StoreFeatureKeys.USER);

export const getUsers= createSelector(
  selectUserFeature,
  state => state.users
);

export const getUsersGroupByGender= createSelector(
  selectUserFeature,
  state => state.usersGroupByGender
);

export const getUsersGroupByAge= createSelector(
  selectUserFeature,
  state => state.usersGroupByAge
);

export const getUsersGrowthByYear= createSelector(
  selectUserFeature,
  state => state.usersGrowthByYear
)

export const getUser= (props) => {
  return createSelector(
    getUsers,
    state => state.find(user => user.Id === props.Id)
  );
};
