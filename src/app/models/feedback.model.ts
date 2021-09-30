import { User } from './user.model';

/**
 * Chatbot feedback
 */

/**
 * App feedback
 */
export interface AppFeedback {
  Id: string,
  rating: number,
  review: string,
  featureCategory: string,
  createdAt: {
    date: string,
    time: string
  },
  user: User
};

export interface AppFeedbackUsers {
  group: string,
  users: User[],
  userAverageAge: number
};

export interface AppFeedbacksGroupByRating {
  veryUseful: AppFeedbackUsers,
  useful: AppFeedbackUsers,
  neutral: AppFeedbackUsers,
  useless: AppFeedbackUsers,
  veryUseless: AppFeedbackUsers
};

export interface AppFeedbacksGrowthByYear {
  month: string,
  feedbacks: AppFeedback[],
  averageRating: number
};