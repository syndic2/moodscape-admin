import { createReducer, on } from '@ngrx/store';

import { ArticleState } from '../states';
import { filterArrayByAnotherArray } from 'src/app/utilities/helpers';
import { setArticles, setArticle, createArticle, updateArticle, removeArticles } from '../actions/article.actions';

const initialState: ArticleState= {
  articles: []
};

export const articleReducer= createReducer(
  initialState,
  on(setArticles, (state, { articles }) => ({ ...state, articles: [...articles] })),

  on(setArticle, (state, { article }) => ({
    ...state,
    articles: [
      ...state.articles.map((object, index) => {
        if (object.Id !== article.Id) {
          return object;
        }

        return article;
      })
    ]
  })),

  on(createArticle, (state, { article }) => ({ ...state, articles: [...state.articles, article] })),

  on(updateArticle, (state, { articleId, fields }) => ({
    ...state,
    articles: [
      ...state.articles.map((article, index) => {
        if (article.Id !== articleId) {
          return article;
        }

        return { ...article, ...fields };
      })
    ]
  })),

  on(removeArticles, (state, { articleIds }) => ({
    ...state,
    articles: [
      ...filterArrayByAnotherArray(
        { type: 'object', items: state.articles },
        { type: 'none-object', items: articleIds },
        { field1: 'Id' }
      )
    ]
  }))
);
