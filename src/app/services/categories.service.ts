import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Category } from '../interfaces/category.interface';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private categoriesUrl = environment.categoriesUrl;
  private http = inject(HttpClient);

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
    return items.sort(() => 0.5 - Math.random()).slice(0, count);
  }

  getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
