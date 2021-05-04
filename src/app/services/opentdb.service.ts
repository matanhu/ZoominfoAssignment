import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { QuestionRes, Question } from '../models/question';

const BASE_API_URL = 'https://opentdb.com/api.php';

@Injectable({
  providedIn: 'root'
})
export class OpentdbService {

  constructor(
    private http: HttpClient
  ) { }

  getQuestion(): Observable<Question> {
    return this.http.get<QuestionRes>(`${BASE_API_URL}?amount=1&encode=base64&type=multiple`).pipe(
      map((res: QuestionRes) => {
        const correctAnsIndex = Math.floor(Math.random() * (3 - 0) + 0);
        const allAns = [...res.results[0].incorrect_answers, res.results[0].correct_answer];
        if (correctAnsIndex < 3) {
          const tmp = allAns[correctAnsIndex];
          allAns[correctAnsIndex] = res.results[0].correct_answer;
          allAns[3] = tmp;
        }
        const question: Question = {
          questionIndex: 0,
          category: atob(res.results[0].category),
          type: atob(res.results[0].type),
          difficulty: atob(res.results[0].difficulty),
          question: atob(res.results[0].question),
          correct_answer: atob(res.results[0].correct_answer),
          incorrect_answers: res.results[0].incorrect_answers.map(a => atob(a)),
          all_answers: allAns.map(a => atob(a)),
        }

        return question;
      })
    );
  }
}
