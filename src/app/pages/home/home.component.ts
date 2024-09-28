import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Category } from '../../interfaces/category.interface';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  categories: Category[] = [];
  categoriesService = inject(CategoriesService);

  ngOnInit(): void {
    this.loadCategories();
  }
  loadCategories(): void {
    this.categoriesService.getRandomCategories().subscribe(
      (data) => {
        this.categories = data.map((category) => ({
          ...category,
          numberOfQuestions: this.categoriesService.getRandomInt(5, 10),
        }));
      },
      (error) => {
        console.error('Error fetching categories', error);
      }
    );
  }
}
