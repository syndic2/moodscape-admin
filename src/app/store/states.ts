import { User, UsersGroupByGender, UsersGroupByAge, UsersGrowthByYear } from '../models/user.model';
import { PsychologyDisease } from '../models/psychology-disease.model';
import { Article } from '../models/article.model';

export interface ApplicationState {
  readonly isResetForm: boolean
};

export interface UserState {
  readonly users: User[],
  readonly usersGroupByGender: UsersGroupByGender,
  readonly usersGroupByAge: UsersGroupByAge,
  readonly usersGrowthByYear: UsersGrowthByYear[]
};

export interface PsychologyDiseaseState {
  readonly diseases: PsychologyDisease[]
};

export interface ArticleState {
  readonly articles: Article[]
};
