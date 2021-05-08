import { Question } from "../types/question";
import { Source } from "../types/question-source";
export declare function countryQuiz(source?: Source): {
    whichCountryForGivenCapital: () => Question;
    whichCountryForGivenFlag: () => Question;
    whichCountryForGivenLanguage: () => Question;
    generateQuiz: (amount: number) => Question[];
};
