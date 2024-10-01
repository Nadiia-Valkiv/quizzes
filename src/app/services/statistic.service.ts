import { Injectable } from '@angular/core';
import { QuizStatistics } from '../interfaces/statistics.interface';

@Injectable({
  providedIn: 'root',
})
export class StatisticService {
  private data!: QuizStatistics;

  private readonly percentageAccuracy = 100;

  setData(score: number, numberOfQuestions: number, timeTaken: number) {
    const accuracyPercentage = parseFloat(
      ((score / numberOfQuestions) * this.percentageAccuracy).toFixed(),
    );
    const averageTimePerQuestion = +(timeTaken / numberOfQuestions).toFixed();

    this.data = {
      score,
      numberOfQuestions,
      timeTaken,
      accuracyPercentage,
      averageTimePerQuestion,
    };
  }

  getStatisticData(): QuizStatistics {
    return this.data;
  }
}
