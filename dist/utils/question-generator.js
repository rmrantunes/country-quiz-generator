"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.countryQuiz = void 0;
const question_1 = require("../types/question");
const app_utils_1 = require("./app-utils");
const countries_json_1 = __importDefault(require("../source/countries.json"));
const languages_json_1 = __importDefault(require("../source/languages.json"));
function countryQuiz(source = { countries: countries_json_1.default, languages: languages_json_1.default }) {
    function selectNCountries(countries = source.countries, amount = 4) {
        const selectedCountries = [];
        for (let i = 0; i < amount; i++) {
            const randomIndex = app_utils_1.getRandomArrayIndex(countries);
            selectedCountries.push(countries[randomIndex]);
        }
        return selectedCountries;
    }
    function selectCorrectCountry(countries) {
        const randomIndex = app_utils_1.getRandomArrayIndex(countries);
        return countries[randomIndex];
    }
    function selectLanguage() {
        const { languages } = source;
        const randomIndex = app_utils_1.getRandomArrayIndex(languages);
        return languages[randomIndex];
    }
    function whichCountryForGivenCapital() {
        const countries = selectNCountries();
        const countriesCapitalAndName = countries.map(({ name, capital }) => ({
            name,
            capital,
        }));
        const correctCountry = selectCorrectCountry(countriesCapitalAndName);
        return {
            type: question_1.QuestionType.WHICH_COUNTRY_FOR_GIVEN_CAPITAL,
            title: correctCountry.capital + " is the capital of",
            correctAnswer: correctCountry.name,
            options: countriesCapitalAndName.map(({ name }) => name),
        };
    }
    function whichCountryForGivenFlag() {
        const countries = selectNCountries();
        const countriesNameAndCode = countries.map(({ name, code }) => ({
            name,
            code: code.toLowerCase(),
        }));
        const correctCountry = selectCorrectCountry(countriesNameAndCode);
        return {
            type: question_1.QuestionType.WHICH_COUNTRY_FOR_GIVEN_FLAG,
            flagSrc: `https://www.countryflags.io/${correctCountry.code}/flat/64.png`,
            title: "Which country does this flag belongs to?",
            correctAnswer: correctCountry.name,
            options: countriesNameAndCode.map(({ name }) => name),
        };
    }
    function selectLanguageSpeakerCountry(language) {
        const { countries } = source;
        return selectNCountries(countries.filter((country) => country.languages.some(({ name }) => name === language.name)), 1)[0];
    }
    function selectNotLanguageSpeakerCountries(language) {
        const { countries } = source;
        return selectNCountries(countries.filter((country) => country.languages.some(({ name }) => name !== language.name)), 3);
    }
    function whichCountryForGivenLanguage() {
        const language = selectLanguage();
        const languageSpeakerCountry = selectLanguageSpeakerCountry(language);
        const notLanguageSpeakerCountries = selectNotLanguageSpeakerCountries(language);
        const options = [
            ...notLanguageSpeakerCountries.map(({ name }) => name),
            languageSpeakerCountry.name,
        ].sort(app_utils_1.randomSort);
        return {
            type: question_1.QuestionType.WHICH_COUNTRY_FOR_GIVEN_LANGUAGE,
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
    function generateQuiz(amount, options) {
        let questionGeneratorsKeys = (options === null || options === void 0 ? void 0 : options.questionTypesToSelect) ||
            Object.keys(questionGenerators);
        if (options === null || options === void 0 ? void 0 : options.questionTypesToExclude) {
            questionGeneratorsKeys = questionGeneratorsKeys.filter((key) => { var _a; return !((_a = options.questionTypesToExclude) === null || _a === void 0 ? void 0 : _a.includes(key)); });
        }
        if (questionGeneratorsKeys.length === 0)
            throw new Error("You must leave at least ONE question type");
        const questions = [];
        for (let i = 0; i < amount; i++) {
            const randomIndex = app_utils_1.getRandomArrayIndex(questionGeneratorsKeys);
            questions.push(questionGenerators[questionGeneratorsKeys[randomIndex]]());
        }
        return questions;
    }
    return {
        ...questionGenerators,
        generateQuiz,
    };
}
exports.countryQuiz = countryQuiz;
