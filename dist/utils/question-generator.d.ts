import { Question, GenerateQuizOptions } from "../types/question";
import { Source } from "../types/question-source";
export declare function countryQuiz(source?: Source): {
    generateQuiz: (amount: number, options?: GenerateQuizOptions<"whichCountryForGivenCapital" | "whichCountryForGivenFlag" | "whichCountryForGivenLanguage"> | undefined) => Question[];
    whichCountryForGivenCapital: () => Question;
    whichCountryForGivenFlag: () => Question;
    whichCountryForGivenLanguage: () => Question;
};
