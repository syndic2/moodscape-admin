import { createReducer, on } from '@ngrx/store';

import { filterArrayByAnotherArray } from 'src/app/utilities/helpers';
import { ThemeState } from '../states';
import { setThemes, createTheme, updateTheme, removeThemes } from '../actions/theme.actions';

const initialState: ThemeState= {
  themes: []
};

export const themeReducer= createReducer(
  initialState,
  on(setThemes, (state, { themes }) => ({ ...state, themes: [...themes] })),

  on(createTheme, (state, { theme }) => ({ ...state, themes: [...state.themes, theme] })),

  on(updateTheme, (state, { themeId, fields }) => ({
    ...state,
    themes: [
      ...state.themes.map(theme => {
        if (theme.Id !== themeId) {
          return theme;
        }

        return { ...theme, ...fields };
      })
    ]
  })),

  on(removeThemes, (state, { themeIds  }) => ({
    ...state,
    themes: [
      ...filterArrayByAnotherArray(
        { type: 'object', items: state.themes },
        { type: 'none-object', items: themeIds },
        { field1: 'Id' }
      )
    ]
  }))
);  