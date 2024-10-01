import { Question } from './question.interface';

export interface QuizQuestion extends Question {
  userAnswer?: string;
}
