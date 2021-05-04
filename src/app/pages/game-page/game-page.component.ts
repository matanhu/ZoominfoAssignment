import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Carousel } from 'primeng/carousel';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { fetchQuestion, updateCurrentIndexToNextQuestion } from 'src/app/app-state/actions';
import { setGameOver, wrongAnswerQuestion } from 'src/app/app-state/actions/game.action';
import { getCorrectNumbers, getCurrentQuestionIndex, getisGameOver, getNumberOfQuestions, getQuestionsList, getWrongNumbers } from 'src/app/app-state/selectors/game.selector';
import { Question } from 'src/app/models/question';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GamePageComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject<boolean>();
  @ViewChild('carousel') carousel: Carousel;
  public questions$: Observable<Array<Question>>;
  public isGameOver$: Observable<boolean>;
  public correctAns$: Observable<number>;
  public inCorrectAns$: Observable<number>;
  public currentQuestionIndex: number;
  public currentPage = 0;
  private numberOfQuestions: number;

  constructor(
    private readonly store: Store,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(updateCurrentIndexToNextQuestion());
    this.store.dispatch(fetchQuestion());
    this.questions$ = this.store.select(state => getQuestionsList(state));
    this.isGameOver$ = this.store.select(state => getisGameOver(state));
    this.correctAns$ = this.store.select(state => getCorrectNumbers(state));
    this.inCorrectAns$ = this.store.select(state => getWrongNumbers(state));

    this.initGame(); 
  }

  initGame() {
    this.store.select(state => getCurrentQuestionIndex(state)).pipe(
      takeUntil(this.destroyed$)
    ).subscribe((index) => this.currentQuestionIndex = index);

    this.store.select(state => getNumberOfQuestions(state)).pipe(
      takeUntil(this.destroyed$)
    ).subscribe((count) => this.numberOfQuestions = count);

    this.inCorrectAns$.pipe(
      takeUntil(this.destroyed$)
    ).subscribe((count) => {
      if(count >= 3) {
        this.store.dispatch(setGameOver());
      }
    });
  }

  onCorrectAns(e) {
    if (this.currentQuestionIndex <= this.numberOfQuestions - 3) {
      this.carousel.navForward(e);
      this.store.dispatch(updateCurrentIndexToNextQuestion());
      this.store.dispatch(fetchQuestion());
    } else if (this.currentQuestionIndex < this.numberOfQuestions - 2) {
      this.carousel.navForward(e);
    }
  }

  onIncorrectAns(e) {
    this.store.dispatch(wrongAnswerQuestion());
  }

  onTimeout(e) {
    this.store.dispatch(setGameOver());
  }

  onPage(event) {
    this.currentPage = event.page;
    console.log('onPage: ', event);
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
  }

}
