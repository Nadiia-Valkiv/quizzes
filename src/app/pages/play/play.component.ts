import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionsService } from '../../services/questions.service';
import { Question } from '../../interfaces/question.interface';

@Component({
  selector: 'app-play',
  standalone: true,
  imports: [],
  templateUrl: './play.component.html',
  styleUrl: './play.component.scss',
})
export class PlayComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private questionsService = inject(QuestionsService);
  private router = inject(Router);
  private categoryId!: string;
  private numberOfQuestions!: string;
  questions: any;

  ngOnInit(): void {
    this.route.params.subscribe((params: { [key: string]: string }) => {
      this.categoryId = params['id'];
      this.numberOfQuestions = params['numberOfQuestions'];
      console.log(
        `id: ${this.categoryId}, questions: ${this.numberOfQuestions}`
      );
    });
    this.loadQuestions(this.categoryId, this.numberOfQuestions);
  }

  loadQuestions(id: string, numberOfQuestions: string) {
    this.questionsService.getQuestions(id, numberOfQuestions).subscribe(
      (data: { results: Question[] }) => {
        this.questions = data.results;
        console.log(this.questions);
      },
      (error) => {
        console.error('Error fetching questions:', error);
      }
    );
  }
}
