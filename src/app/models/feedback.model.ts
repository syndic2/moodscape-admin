import { User } from './user.model';

/**
 * App feedback
 */
export interface AppFeedback {
  Id: string;
  rating: number;
  review: string;
  featureCategory: string;
  handleStatus: string;
  handleNote: string;
  createdAt: {
    date: string;
    time: string;
  },
  user: User
}

export interface AppFeedbackUsers {
  group: string;
  users: User[];
  userAverageAge: number;
}

export interface AppFeedbacksGroupByRating {
  veryUseful: AppFeedbackUsers;
  useful: AppFeedbackUsers;
  neutral: AppFeedbackUsers;
  useless: AppFeedbackUsers;
  veryUseless: AppFeedbackUsers;
}

export interface AppFeedbacksGrowthByYear {
  monthName: string;
  monthNumber: number;
  year: number;
  feedbacks: AppFeedback[];
  averageRating: number;
}

/**
 * Chatbot feedback
 */
export interface ChatbotMessage {
  Id: string;
  sender: string | number;
  recipientId: string | number;
  text: string;
}

export interface ChatbotFeedback {
  Id: string;
  review: string;
  botMessage: ChatbotMessage;
  messages: ChatbotMessage[];
  user: User;
  handleStatus: string;
  handleNote: string;
  createdAt: {
    date: string;
    time: string;
  }
}
