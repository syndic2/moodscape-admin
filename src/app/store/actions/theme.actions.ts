import { createAction, props } from '@ngrx/store';

import { Theme } from 'src/app/models/theme.model';

//Fetch API
export const fetchThemes = createAction('[Theme/API] Get themes');

export const fetchTheme = createAction(
  '[Theme/API] Get theme',
  props<{ themeId: string }>()
);

export const validateCreateTheme = createAction(
  '[Theme/API] Validate create theme form',
  props<{ fields: {}, isInvalid: boolean }>()
);

export const fetchCreateTheme = createAction(
  '[Theme/API] Create theme',
  props<{ fields: {} }>()
);

export const validateUpdateTheme = createAction(
  '[Theme/API] Validate update theme form',
  props<{ themeId: string, fields: {}, isInvalid: boolean }>()
);

export const fetchUpdateTheme = createAction(
  '[Theme/API] Update theme',
  props<{ themeId: string, fields: {} }>()
);

export const removeThemesConfirmation = createAction(
  '[Theme/API] Remove themes confirmation',
  props<{ themeIds: string[] }>()
);

export const fetchRemoveThemes = createAction(
  '[Theme/API] Remove themes',
  props<{ themeIds: string[], isSoftDelete: boolean }>()
);

//STORE
export const setThemes = createAction(
  '[Theme/STORE] Set themes',
  props<{ themes: Theme[] }>()
);

export const createTheme = createAction(
  '[Theme/STORE] Create theme',
  props<{ theme: Theme }>()
);

export const updateTheme = createAction(
  '[Theme/STORE] Update theme',
  props<{ themeId: string, fields: {} }>()
);

export const removeThemes = createAction(
  '[Theme/STORE] Remove themes',
  props<{ themeIds: string[] }>()
);
