// export type QuestionType = "capital-of" | "flag" | "language";

export type QuestionType =
  | "whichCountryForGivenCapital"
  | "whichCountryForGivenFlag"
  | "whichCountryForGivenLanguage";

export interface Question {
  type: QuestionType;
  flagSrc?: string;
  title: string;
  correctAnswer: string;
  options: string[];
}

export interface GenerateQuizOptions<K> {
  questionTypesToSelect?: K[];
  questionTypesToExclude?: K[];
}
