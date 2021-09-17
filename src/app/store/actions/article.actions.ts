import { createAction, props } from '@ngrx/store';

import { Article } from 'src/app/models/article.model';

//Fetch API
export const fetchArticles= createAction('[Article/API] Get articles');

export const fetchArticle= createAction(
  '[Article/API] Get article',
  props<{ articleId: number }>()
);

export const validateCreateArticle= createAction(
  '[Article/API] Validate create article',
  props<{ fields: {}, isInvalid: boolean }>()
);

export const fetchCreateArticle= createAction(
  '[Article/API] Create new article',
  props<{ fields: {} }>()
);

export const validateUpdateArticle= createAction(
  '[Article/API] Validate update article',
  props<{ articleId: number, fields: {}, isInvalid: boolean }>()
);

export const fetchUpdateArticle= createAction(
  '[Article/API] Update article',
  props<{ articleId: number, fields: {} }>()
);

export const removeArticlesConfirmation= createAction(
  '[Article/API] Remove articles confirmation',
  props<{ articleTitle: string, articleIds: number[] }>()
);

export const fetchRemoveArticles= createAction(
  '[Article/API] Remove articles',
  props<{ articleIds: number[] }>()
);

//STORE
export const setArticles= createAction(
  '[Article/STORE] Set articles',
  props<{ articles: Article[] }>()
);

export const setArticle= createAction(
  '[Article/STORE] Set article',
  props<{ article: Article }>()
);

export const createArticle= createAction(
  '[Article/STORE] Create new article',
  props<{ article: Article }>()
);

export const updateArticle= createAction(
  '[Article/STORE] Update article',
  props<{ articleId: number, fields: {} }>()
);

export const removeArticles= createAction(
  '[Article/STORE] Remove articles',
  props<{ articleIds: number[] }>()
);
