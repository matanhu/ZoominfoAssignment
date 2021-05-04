import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { GamePageComponent } from './pages/game-page/game-page.component';
import { Store, StoreModule } from '@ngrx/store';
import { reducers, metaReducers, AppState } from './app-state';
import { GameEffects } from './app-state/effects/game.effect';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { fetchQuestion } from './app-state/actions';
import { getQuestionsList } from './app-state/selectors/game.selector';
import { filter, take } from 'rxjs/operators';
import { QuizComponent } from './components/quiz/quiz.component';
import { FormsModule } from '@angular/forms';



export function initApplication(store: Store<AppState>): Function {
  return () => new Promise(resolve => {
       store.dispatch(fetchQuestion());
       store.select((state: any) => getQuestionsList(state))
          .pipe(
             filter(questions =>  questions !== null && questions !== undefined && questions.length > 0 && questions[0] !== undefined),
              take(1)
           ).subscribe((questions) => {
                // store.dispatch(new FinishAppInitializer());
                resolve(true);
           });
        })
}



@NgModule({
  declarations: [
    AppComponent,
    GamePageComponent,
    QuizComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    EffectsModule.forRoot([GameEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initApplication,
      multi: true,
      deps: [Store]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
