import countries from "./source/countries.json";
import languages from "./source/languages.json";
import { Country } from "./types/question-source";
import { QuestionGenerator } from "./utils/question-generator";

export const countryQuizGenerator = QuestionGenerator({
  countries: countries as Country[],
  languages,
});
