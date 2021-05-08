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

export enum QuestionType {
  WHICH_COUNTRY_BY_CAPITAL = "WHICH_COUNTRY_BY_CAPITAL",
  WHICH_COUNTRY_BY_FLAG = "WHICH_COUNTRY_BY_FLAG",
  WHICH_COUNTRY_BY_LANGUAGE = "WHICH_COUNTRY_BY_LANGUAGE",
}

export interface Question {
  type?: QuestionType;
  flagSrc?: string;
  title: string;
  correctAnswer: string;
  options: string[];
}

export function countryQuiz(
  source?: Source
): {
  whichCountryForGivenCapital: () => Question;
  whichCountryForGivenFlag: () => Question;
  whichCountryForGivenLanguage: () => Question;
  generateQuiz: (amount: number) => Question[];
};

export function generateQuiz(amount: number): Question[];

export const questionGenerators: {
  whichCountryForGivenCapital: () => Question;
  whichCountryForGivenFlag: () => Question;
  whichCountryForGivenLanguage: () => Question;
};
