import { Question, QuestionType, GenerateQuizOptions } from "../types/question";
import {
  Country,
  Language,
  MappedCountry,
  Source,
} from "../types/question-source";
import { getRandomArrayIndex, randomSort } from "./app-utils";

import countries from "../source/countries.json";
import languages from "../source/languages.json";

export function countryQuiz(
  source: Source = { countries: countries as Country[], languages }
) {
  function selectNCountries(
    countries = source.countries,
    amount = 4
  ): Country[] {
    const selectedCountries = [];
    for (let i = 0; i < amount; i++) {
      const randomIndex = getRandomArrayIndex(countries);
      selectedCountries.push(countries[randomIndex]);
    }
    return selectedCountries;
  }

  function selectCorrectCountry(countries: MappedCountry[]) {
    const randomIndex = getRandomArrayIndex(countries);
    return countries[randomIndex];
  }

  function selectLanguage() {
    const { languages } = source;
    const randomIndex = getRandomArrayIndex(languages);
    return languages[randomIndex];
  }

  function whichCountryForGivenCapital(): Question {
    const countries = selectNCountries();
    const countriesCapitalAndName = countries.map(({ name, capital }) => ({
      name,
      capital,
    }));
    const correctCountry = selectCorrectCountry(countriesCapitalAndName);

    return {
      type: QuestionType.WHICH_COUNTRY_FOR_GIVEN_CAPITAL,
      title: correctCountry.capital + " is the capital of",
      correctAnswer: correctCountry.name,
      options: countriesCapitalAndName.map(({ name }) => name),
    };
  }

  function whichCountryForGivenFlag(): Question {
    const countries = selectNCountries();
    const countriesNameAndCode = countries.map(({ name, code }) => ({
      name,
      code: code.toLowerCase(),
    }));

    const correctCountry = selectCorrectCountry(countriesNameAndCode);

    return {
      type: QuestionType.WHICH_COUNTRY_FOR_GIVEN_FLAG,
      flagSrc: `https://www.countryflags.io/${correctCountry.code}/flat/64.png`,
      title: "Which country does this flag belongs to?",
      correctAnswer: correctCountry.name,
      options: countriesNameAndCode.map(({ name }) => name),
    };
  }

  function selectLanguageSpeakerCountry(language: Language) {
    const { countries } = source;
    return selectNCountries(
      countries.filter((country) =>
        country.languages.some(({ name }) => name === language.name)
      ),
      1
    )[0];
  }

  function selectNotLanguageSpeakerCountries(language: Language) {
    const { countries } = source;
    return selectNCountries(
      countries.filter((country) =>
        country.languages.some(({ name }) => name !== language.name)
      ),
      3
    );
  }

  function whichCountryForGivenLanguage(): Question {
    const language = selectLanguage();
    const languageSpeakerCountry = selectLanguageSpeakerCountry(language);
    const notLanguageSpeakerCountries = selectNotLanguageSpeakerCountries(
      language
    );

    const options = [
      ...notLanguageSpeakerCountries.map(({ name }) => name),
      languageSpeakerCountry.name,
    ].sort(randomSort);

    return {
      type: QuestionType.WHICH_COUNTRY_FOR_GIVEN_LANGUAGE,
      correctAnswer: languageSpeakerCountry.name,
      options,
      title: `Which one of these countries speaks ${language.name}?`,
    };
  }

  const questionGenerators = {
    whichCountryForGivenCapital,
    whichCountryForGivenFlag,
    whichCountryForGivenLanguage,
  };

  function generateQuiz(
    amount: number,
    options?: GenerateQuizOptions<keyof typeof questionGenerators>
  ) {
    let questionGeneratorsKeys =
      options?.selectQuestionTypes ||
      (Object.keys(questionGenerators) as (keyof typeof questionGenerators)[]);

    if (options?.excludeQuestionTypes) {
      questionGeneratorsKeys = questionGeneratorsKeys.filter(
        (key) => !options.excludeQuestionTypes?.includes(key)
      );
    }

    if (questionGeneratorsKeys.length === 0)
      throw new Error("You must leave at least ONE question type");

    const questions: Question[] = [];

    for (let i = 0; i < amount; i++) {
      const randomIndex = getRandomArrayIndex(questionGeneratorsKeys);
      questions.push(questionGenerators[questionGeneratorsKeys[randomIndex]]());
    }

    return questions;
  }

  return {
    ...questionGenerators,
    generateQuiz,
  };
}
