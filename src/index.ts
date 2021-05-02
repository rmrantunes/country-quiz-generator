import countries from "./source/countries.json";
import languages from "./source/languages.json";
import { QuestionGenerator } from "./utils/question-generator";

export const countryQuizGenerator = new QuestionGenerator({
  countries,
  languages,
});

countryQuizGenerator.generate(3);
