import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { interval, Subject } from 'rxjs';
import { map, take, takeUntil, tap } from 'rxjs/operators';
import { Question } from 'src/app/models/question';

let nextId = 0;

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizComponent implements OnInit, OnDestroy {
  public compId = `quiz-${nextId++}`;
  private destroyed$ = new Subject<boolean>();
  public isIncorrecAns = false;
  @Input() question: Question;
  @Output() onCorrectAns = new EventEmitter<any>();
  @Output() onIncorrectAns = new EventEmitter<any>();
  @Output() onTimeout = new EventEmitter<any>();
  public countdown$;
  constructor() { }

  ngOnInit(): void {
    this.countdown$ = interval(1000)
        .pipe(
          takeUntil(this.destroyed$),
            map((count: number) => {
              const totalCount = 20 - count;
              if (totalCount <= 0) {
                this.onTimeout.emit();
                return 0;
              }
              return totalCount;
            })
        );
  }

  onAns(f: NgForm): void {
    if (this.question.correct_answer === f.value.quiz) {
      this.onCorrectAns.emit();
      this.isIncorrecAns = false;
    } else {
      this.onIncorrectAns.emit();
      this.isIncorrecAns = true;
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }

}
