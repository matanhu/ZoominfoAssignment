export interface QuestionRes {
  response_code: number;
  results: Question[];
}

export interface Question {
  questionIndex: number;
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: Array<string>;
  all_answers: Array<string>;
}


