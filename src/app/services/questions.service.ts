import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  private categoryUrl = 'https://opentdb.com/api.php';
  private http = inject(HttpClient);

  getQuestions(categoryId: string, numberOfQuestions: string): Observable<any> {
    const url = `${this.categoryUrl}?amount=${numberOfQuestions}&category=${categoryId}`;
    return this.http.get(url);
  }
}
