import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Category } from '../interfaces/category.interface';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private categoriesUrl = 'https://opentdb.com/api_category.php';
  private categoriesCache: Category[] | null = null;
  http = inject(HttpClient);
  constructor() {}

  getRandomCategories(count: number = 10): Observable<Category[]> {
    return this.http
      .get<{ trivia_categories: Category[] }>(this.categoriesUrl)
      .pipe(
        map((response) =>
          this.getRandomItems(response.trivia_categories, count)
        ),
        tap((x) => console.log(x))
      );
  }

  private getRandomItems<T>(items: T[], count: number): T[] {
    const shuffled = items.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
