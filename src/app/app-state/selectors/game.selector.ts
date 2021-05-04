import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "..";
import { GameState } from "../reducers/game.reducer";



export const getGameState = createFeatureSelector<GameState>('Game');

export const getNumberOfQuestions = createSelector(
  getGameState,
  (state: GameState) => state.numberOfQuestions
);

export const getQuestionsList = createSelector(
  getGameState,
  (state: GameState) => state.questionsList
);

export const getCurrentQuestionIndex = createSelector(
  getGameState,
  (state: GameState) => state.currentQuestionIndex
);

export const getisGameOver = createSelector(
  getGameState,
  (state: GameState) => state.isGameOver
);

export const getWrongNumbers = createSelector(
  getGameState,
  (state: GameState) => state.wrongNumbers
)

export const getCorrectNumbers = createSelector(
  getGameState,
  (state: GameState) => state.correctNumbers
)


