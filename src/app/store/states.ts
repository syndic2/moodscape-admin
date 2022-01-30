import { TotalMoodGroupByType, MoodsGrowthByYear } from '../models/mood.model';
import { User, UsersGroupByGender, UsersGroupByAge, UsersGrowthByYear } from '../models/user.model';
import { PsychologyDisease } from '../models/psychology-disease.model';
import { Article } from '../models/article.model';
import { Theme } from '../models/theme.model';
import { AppFeedback, AppFeedbacksGroupByRating, AppFeedbacksGrowthByYear } from '../models/feedback.model';

export interface ApplicationState {
  readonly isResetForm: boolean
}

export interface MoodState {
  readonly totalMoodGroupByType: TotalMoodGroupByType;
  readonly moodsGrowtByYear: MoodsGrowthByYear[];
}

export interface UserState {
  readonly users: User[],
  readonly usersGroupByGender: UsersGroupByGender,
  readonly usersGroupByAge: UsersGroupByAge,
  readonly usersGrowthByYear: UsersGrowthByYear[]
}

export interface PsychologyDiseaseState {
  readonly diseases: PsychologyDisease[]
}

export interface ArticleState {
  readonly articles: Article[]
}

export interface ThemeState {
  readonly themes: Theme[]
}

export interface FeedbackState {
  /**
   * Chatbot feedback
   */

  /**
   * App feedback
   */
  readonly appFeedbacks: AppFeedback[],
  readonly appFeedbacksGroupByRating: AppFeedbacksGroupByRating,
  readonly appFeedbackGrowthByYear: AppFeedbacksGrowthByYear[]
}
