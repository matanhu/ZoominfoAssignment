import { createAction, props } from "@ngrx/store";
import { Question } from "src/app/models/question";

const FETCH_QUESTION = "[GAME] Fetch Question";
const FETCH_QUESTION_SUCCESS = "[GAME] Fetch Question Success";
const FETCH_QUESTION_FAILED = "[GAME] Fetch Question Failed";

const UPDATE_CURRENT_INDEX_TO_NEXT_QUESTION = "[GAME] Update Current Index To Next Question";

const WRONG_ANSWER_QUESTION = "[GAME] Wrong Answer Question";

const SET_GAME_OVER = "[GAME] Set Game Over";

export const fetchQuestion = createAction(
  FETCH_QUESTION,
);
export const fetchQuestionSuccess = createAction(
  FETCH_QUESTION_SUCCESS,
  props<{question: Question}>()
);
export const fetchQuestionFailed = createAction(
  FETCH_QUESTION_FAILED,
  props<{error: string}>()
);

export const updateCurrentIndexToNextQuestion = createAction(
  UPDATE_CURRENT_INDEX_TO_NEXT_QUESTION
)


export const wrongAnswerQuestion = createAction(
  WRONG_ANSWER_QUESTION
)

export const setGameOver = createAction(
  SET_GAME_OVER
)
