import { Action, createReducer, on } from "@ngrx/store";
import { Question } from "src/app/models/question.interface";
import { fetchQuestion, fetchQuestionFailed, fetchQuestionSuccess, updateCurrentIndexToNextQuestion } from "../actions";
import { setGameOver, wrongAnswerQuestion } from "../actions/game.action";

export interface GameState {
  numberOfQuestions: number;
  questionsList: Array<Question>;
  currentQuestionIndex: number;
  isGameOver: boolean;
  isLoading: boolean;
  errorMessage: string;
  correctNumbers: number;
  wrongNumbers: number;
}


export const initialState: GameState = {
  numberOfQuestions: 10,
  questionsList: new Array<Question>(10),
  currentQuestionIndex: -1,
  isGameOver: false,
  isLoading: false,
  errorMessage: '',
  correctNumbers: -1,
  wrongNumbers: 0
}

export function gameReducer(state: GameState | undefined, action: Action): any {
  return reducer(state, action);
}

const reducer = createReducer(
  initialState,
  on(fetchQuestion, (state) => {
    return { ...state, isLoading: true }
  }),
  on(fetchQuestionSuccess, (state, { question }) => {
    const tmp = {
      ...question,
      questionIndex: state.currentQuestionIndex + 1
    };
    const questionsList = [...state.questionsList];
    questionsList[tmp.questionIndex] = tmp;
    return {
      ...state,
      isLoading: false,
      questionsList: [...questionsList]
    }
  }),
  on(fetchQuestionFailed, (state, { error }) => {
    return {
      ...state,
      isLoading: false,
      errorMessage: error
    }
  }),

  on(updateCurrentIndexToNextQuestion, (state) => {
    return {
      ...state,
      secondsToQuestion: 20,
      currentQuestionIndex: state.currentQuestionIndex + 1,
      correctNumbers: state.correctNumbers + 1
    }
  }),

  on(wrongAnswerQuestion, (state) => {
    return {
      ...state,
      wrongNumbers: state.wrongNumbers + 1
    }
  }),

  on(setGameOver, (state) => {
    return {
      ...state,
      isGameOver: true
    };
  })
);