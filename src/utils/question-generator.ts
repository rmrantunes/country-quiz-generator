import { Question, QuestionType } from "../types/question";
import {
  Country,
  Language,
  MappedCountry,
  Source,
} from "../types/question-source";
import { getRandomArrayIndex } from "./app-utils";

export class QuestionGenerator {
  constructor(private source: Source) {}

  private selectNCountries(
    countries = this.source.countries,
    amount = 4
  ): Country[] {
    const selectedCountries = [];
    for (let i = 0; i < amount; i++) {
      const countriesRandomIndex = getRandomArrayIndex(countries);
      selectedCountries.push(countries[countriesRandomIndex]);
    }
    return selectedCountries;
  }

  private selectCorrectCountry(countries: MappedCountry[]) {
    const countriesRandomIndex = getRandomArrayIndex(countries);
    return countries[countriesRandomIndex];
  }

  private selectLanguage() {
    const { languages } = this.source;
    const languagesRandomIndex = getRandomArrayIndex(languages);
    return languages[languagesRandomIndex];
  }

  whichCountryForGivenCapital(): Question {
    const countries = this.selectNCountries();
    const countriesCapitalAndName = countries.map(({ name, capital }) => ({
      name,
      capital,
    }));
    const correctCountry = this.selectCorrectCountry(countriesCapitalAndName);

    return {
      type: QuestionType.CAPITAL_OF,
      title: correctCountry.capital + " is the capital of",
      correctAnswer: correctCountry.name,
      options: countriesCapitalAndName.map(({ name }) => name),
    };
  }

  whichCountryForGivenFlag(): Question {
    const countries = this.selectNCountries();
    const countriesNameAndCode = countries.map(({ name, code }) => ({
      name,
      code: code.toLowerCase(),
    }));

    const correctCountry = this.selectCorrectCountry(countriesNameAndCode);

    return {
      type: QuestionType.FLAG_OF,
      flagSrc: `https://www.countryflags.io/${correctCountry.code}/flat/64.png`,
      title: "Which country does this flag belongs to?",
      correctAnswer: correctCountry.name,
      options: countriesNameAndCode.map(({ name }) => name),
    };
  }

  private selectLanguageSpeaker(language: Language) {
    const { countries } = this.source;
    return this.selectNCountries(
      countries.filter((country) =>
        country.languages.some(({ name }) => name === language.name)
      ),
      1
    )[0];
  }

  private selectNotLanguageSpeakers(language: Language) {
    const { countries } = this.source;
    return this.selectNCountries(
      countries.filter((country) =>
        country.languages.some(({ name }) => name !== language.name)
      ),
      3
    );
  }

  whichCountryForGivenLanguage(): Question {
    const language = this.selectLanguage();
    const languageSpeakerCountry = this.selectLanguageSpeaker(language);
    const notLanguageSpeakerCountries = this.selectNotLanguageSpeakers(
      language
    );

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

  generate(amount: number) {
    const generatorMethods = [
      "whichCountryForGivenFlag",
      "whichCountryForGivenCapital",
      "whichCountryForGivenLanguage",
    ];
    const questions: Question[] = [];

    for (let i = 0; i < amount; i++) {
      const randomIndex = getRandomArrayIndex(generatorMethods);
      questions.push(this[generatorMethods[randomIndex]]());
    }

    return questions;
  }
}
