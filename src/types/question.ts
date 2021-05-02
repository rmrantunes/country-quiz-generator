// export type QuestionType = "capital-of" | "flag" | "language";

export enum QuestionType {
  CAPITAL_OF = "capital-of",
  FLAG_OF = "flag-of",
  LANGUAGE_OF = "language-of",
}

export interface Question {
  type?: QuestionType;
  flagSrc?: string;
  title: string;
  correctAnswer: string;
  options: string[];
}
