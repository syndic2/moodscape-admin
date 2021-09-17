import { createSelector, createFeatureSelector } from '@ngrx/store';

import { StoreFeatureKeys } from '../feature-keys';
import { ArticleState } from '../states';

const selectArticleFeature= createFeatureSelector<ArticleState>(StoreFeatureKeys.ARTICLE);

export const getArticles= createSelector(
  selectArticleFeature,
  state => [...state.articles].sort((o1, o2) => o2.Id > o1.Id ? 1 : -1)
);

export const getArticle= (props) => {
  return createSelector(
    getArticles,
    state => state.find(article => article.Id === props.Id)
  )
};
