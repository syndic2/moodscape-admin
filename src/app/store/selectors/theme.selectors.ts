import { createSelector, createFeatureSelector } from '@ngrx/store';

import { StoreFeatureKeys } from '../feature-keys';
import { ThemeState } from '../states';

const selectThemeFeature= createFeatureSelector<ThemeState>(StoreFeatureKeys.THEME);

export const getThemes= createSelector(
  selectThemeFeature,
  state => state.themes
);

export const getTheme= (props) => {
  return createSelector(
    selectThemeFeature,
    state => state.themes.find(theme => theme.Id === props.Id)
  )
};