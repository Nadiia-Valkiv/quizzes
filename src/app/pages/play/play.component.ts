import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionsService } from '../../services/questions.service';
import { Question } from '../../interfaces/question.interface';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StatisticService } from '../../services/statistic.service';
import { QuizQuestion } from '../../interfaces/quizQuestion.interface';
import { calculateTakenTimeOnQuiz, shuffleArray } from '../../shared/utils';

@Component({
  selector: 'app-play',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatRadioModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './play.component.html',
  styleUrl: './play.component.scss',
})
export class PlayComponent implements OnInit {
  private readonly id = 'id';
  private readonly numberOfQuestions = 'numberOfQuestions';

  private route = inject(ActivatedRoute);
  private questionsService = inject(QuestionsService);
  private statisticService = inject(StatisticService);
  private router = inject(Router);

  score: number = 0;
  questions = signal<QuizQuestion[]>([]);
  currentQuestionIndex = signal(0);

  startTime: number = 0;
  timeTaken: number = 0;

  currentQuestion = computed(
    () => this.questions()[this.currentQuestionIndex()] || ({} as QuizQuestion),
  );

  isLastQuestion = computed(
    () => this.currentQuestionIndex() === this.questions().length - 1,
  );

  ngOnInit(): void {
    this.route.params.subscribe((params: { [key: string]: string }) => {
      const categoryId = params[this.id];
      const numberOfQuestions = params[this.numberOfQuestions];
      this.loadQuestions(categoryId, numberOfQuestions);
    });
  }

  loadQuestions(id: string, numberOfQuestions: string) {
    this.questionsService.getQuestions(id, numberOfQuestions).subscribe({
      next: (data: { results: Question[] }) => {
        this.prepareQuestionsForQuiz(data);
        this.startTime = Date.now();
      },
      error: (error) => {
        console.error('Error fetching questions:', error);
      },
    });
  }

  onAnswerSelected() {}

  nextQuestion() {
    if (this.currentQuestionIndex() < this.questions().length - 1) {
      this.currentQuestionIndex.update((index) => index + 1);
    }
  }

  submitQuiz() {
    this.calculateStatistic();
    this.router.navigate(['finish']);
  }

  goToHomePage(): void {
    this.router.navigate(['']);
  }

  private prepareQuestionsForQuiz(data: { results: Question[] }): void {
    const quizQuestions = data.results.map((q) => ({
      ...q,
      allAnswers: shuffleArray([...q.incorrect_answers, q.correct_answer]),
    }));
    this.questions.set(quizQuestions);
  }

  private calculateStatistic(): void {
    this.score = this.questions().reduce(
      (acc, q) => acc + (q.userAnswer === q.correct_answer ? 1 : 0),
      0,
    );
    this.timeTaken = calculateTakenTimeOnQuiz(this.startTime);
    this.saveUserStats();
  }

  private saveUserStats(): void {
    this.statisticService.setData(
      this.score,
      this.questions().length,
      this.timeTaken,
    );
  }
}
