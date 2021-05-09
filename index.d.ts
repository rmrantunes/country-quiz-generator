export interface Language {
  name: string;
  code: string;
}

export interface Continent {
  name: string;
}

export interface Country {
  name: string;
  capital: string;
  code: string;
  continent: Continent;
  languages: Language[];
}

export interface MappedCountry {
  name: string;
  code?: string;
  capital?: string;
}

export interface Source {
  countries: Country[];
  languages: Language[];
}

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

export function generateQuiz(
  amount: number,
  options?: GenerateQuizOptions<QuestionType> | undefined
): Question[];

export const questionGenerators: {
  whichCountryForGivenCapital: () => Question;
  whichCountryForGivenFlag: () => Question;
  whichCountryForGivenLanguage: () => Question;
};
