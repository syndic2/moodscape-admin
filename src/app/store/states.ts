import { TotalMoodGroupByType, MoodsGrowthByYear } from '../models/mood.model';
import { User, UsersGroupByGender, UsersGroupByAge, UsersGrowthByYear } from '../models/user.model';
import { Article } from '../models/article.model';
import { Theme } from '../models/theme.model';
import { AppFeedback, AppFeedbacksGroupByRating, AppFeedbacksGrowthByYear, ChatbotFeedback } from '../models/feedback.model';

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

export interface ArticleState {
  readonly articles: Article[]
}

export interface ThemeState {
  readonly themes: Theme[]
}

export interface FeedbackState {
  /**
   * App feedback
   */
  readonly appFeedbacks: AppFeedback[],
  readonly appFeedbacksGroupByRating: AppFeedbacksGroupByRating,
  readonly appFeedbackGrowthByYear: AppFeedbacksGrowthByYear[],

  /**
   * Chatbot feedback
   */
  readonly chatbotFeedbacks: ChatbotFeedback[];
}
