import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Category } from '../../interfaces/category.interface';
import { CategoriesService } from '../../services/categories.service';
import { MatCardModule } from '@angular/material/card';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatLineModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { map, Observable } from 'rxjs';
import { categoriesStore } from '../../store/categories.store';
import { select, setProp } from '@ngneat/elf';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatCardModule,
    MatToolbar,
    MatButtonModule,
    MatListModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  categories$!: Observable<Category[]>;
  categories: Category[] = [];
  categoriesService = inject(CategoriesService);
  router = inject(Router);
  ngOnInit(): void {
    this.categories$ = categoriesStore.pipe(
      select((state) => state.categories)
    );

    this.categories$.subscribe((categories) => {
      if (categories.length === 0) {
        this.loadCategories();
      } else {
        this.categories = categories;
      }
    });
  }

  loadCategories(): void {
    this.categoriesService.getRandomCategories().subscribe(
      (data) => (this.categories = data),
      (error) => {
        console.error('Error fetching categories', error);
      }
    );
  }

  goToPlay(id: number, numberOfQuestions: number | undefined): void {
    this.router.navigate(['play', id, numberOfQuestions]);
  }
}
