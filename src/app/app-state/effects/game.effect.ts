import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, concatMap, map, withLatestFrom } from "rxjs/operators";
import { OpentdbService } from "src/app/services/opentdb.service";
import { fetchQuestion, fetchQuestionFailed, fetchQuestionSuccess } from "../actions";
import { getNumberOfQuestions, getQuestionsList } from "../selectors/game.selector";

@Injectable()
export class GameEffects {

  constructor(
    private readonly store: Store,
    private actions$: Actions,
    private opentdbService: OpentdbService
  ) { }

  fetchQuestion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchQuestion),
      withLatestFrom(this.store.select(state => getQuestionsList  (state))),
      concatMap(([action, questionList]) => {
        const questionsList = questionList;
        return this.opentdbService.getQuestion().pipe(
          map(res => {
            const isExist = questionsList.findIndex(q => q && q.question && q.question === res.question);
            if (isExist > -1) {
              return fetchQuestion();
            } else {
              return fetchQuestionSuccess({ question: res });
            }
          },
            catchError((error: any) => of(fetchQuestionFailed({ error: 'Fetch customers error' }))))
        )
      })
    ));
}
