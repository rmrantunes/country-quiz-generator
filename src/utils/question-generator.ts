import { Question, QuestionType } from "../types/question";
import {
  Country,
  Language,
  MappedCountry,
  Source,
} from "../types/question-source";
import { getRandomArrayIndex } from "./app-utils";

export function QuestionGenerator(source: Source) {
  function selectNCountries(
    countries = source.countries,
    amount = 4
  ): Country[] {
    const selectedCountries = [];
    for (let i = 0; i < amount; i++) {
      const countriesRandomIndex = getRandomArrayIndex(countries);
      selectedCountries.push(countries[countriesRandomIndex]);
    }
    return selectedCountries;
  }

  function selectCorrectCountry(countries: MappedCountry[]) {
    const countriesRandomIndex = getRandomArrayIndex(countries);
    return countries[countriesRandomIndex];
  }

  function selectLanguage() {
    const { languages } = source;
    const languagesRandomIndex = getRandomArrayIndex(languages);
    return languages[languagesRandomIndex];
  }

  function whichCountryForGivenCapital(): Question {
    const countries = selectNCountries();
    const countriesCapitalAndName = countries.map(({ name, capital }) => ({
      name,
      capital,
    }));
    const correctCountry = selectCorrectCountry(countriesCapitalAndName);

    return {
      type: QuestionType.CAPITAL_OF,
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
      type: QuestionType.FLAG_OF,
      flagSrc: `https://www.countryflags.io/${correctCountry.code}/flat/64.png`,
      title: "Which country does this flag belongs to?",
      correctAnswer: correctCountry.name,
      options: countriesNameAndCode.map(({ name }) => name),
    };
  }

  function selectLanguageSpeaker(language: Language) {
    const { countries } = source;
    return selectNCountries(
      countries.filter((country) =>
        country.languages.some(({ name }) => name === language.name)
      ),
      1
    )[0];
  }

  function selectNotLanguageSpeakers(language: Language) {
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
    const languageSpeakerCountry = selectLanguageSpeaker(language);
    const notLanguageSpeakerCountries = selectNotLanguageSpeakers(language);

    const options = [
      ...notLanguageSpeakerCountries.map(({ name }) => name),
      languageSpeakerCountry.name,
    ];

    return {
      type: QuestionType.LANGUAGE_OF,
      correctAnswer: languageSpeakerCountry.name,
      options,
      title: `Which one of these countries speaks ${language.name}?`,
    };
  }

  // function generate(amount: number) {
  //   const generatorMethods = [
  //     "whichCountryForGivenFlag",
  //     "whichCountryForGivenCapital",
  //     "whichCountryForGivenLanguage",
  //   ];
  //   const questions: Question[] = [];

  //   for (let i = 0; i < amount; i++) {
  //     const randomIndex = getRandomArrayIndex(generatorMethods);
  //     // questions.push(this[generatorMethods[randomIndex]]());
  //   }

  //   return questions;
  // }

  return {
    whichCountryForGivenCapital,
    whichCountryForGivenFlag,
    whichCountryForGivenLanguage,
    // generate,
  };
}
