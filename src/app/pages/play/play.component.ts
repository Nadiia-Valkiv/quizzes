import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-play',
  standalone: true,
  imports: [],
  templateUrl: './play.component.html',
  styleUrl: './play.component.scss',
})
export class PlayComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private categoryId!: string;
  private numberOfQuestions!: string;

  ngOnInit(): void {
    this.route.params.subscribe((params: { [key: string]: string }) => {
      this.categoryId = params['id'];
      this.numberOfQuestions = params['numberOfQuestions'];
      console.log(
        `id: ${this.categoryId}, questions: ${this.numberOfQuestions}`
      );
    });
  }
}
