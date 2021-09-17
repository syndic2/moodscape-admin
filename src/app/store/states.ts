import { PsychologyDisease } from '../models/psychology-disease.model';
import { Article } from '../models/article.model';

export interface ApplicationState {
  readonly isResetForm: boolean
};

export interface PsychologyDiseaseState {
  readonly diseases: PsychologyDisease[]
};

export interface ArticleState {
  readonly articles: Article[]
};
