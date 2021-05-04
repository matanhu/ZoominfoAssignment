import { Question } from "./question.interface";

export interface QuestionRes {
  response_code: number;
  results: Question[];
}