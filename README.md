# Country Quiz Generator

Generate multiple choice questions about countries randomly.

## Installation

`npm i country-quiz-generator`

`yarn add country-quiz-generator`

## Get started

### Types of questions:

- Which COUNTRY for given CAPITAL
- Which COUNTRY for given FLAG
- Which COUNTRY for given LANGUAGE
- _(Soon)_ Which CAPITAL for given COUNTRY
- _(Soon)_ Which LANGUAGE for given COUNTRY
- _(Soon)_ Which CONTINENT for given COUNTRY

### Generate an array of questions - `generateQuiz(amount, options?)`:

```js
import { generateQuiz } from "country-quiz-generator";

const myQuiz = generateQuiz(2);

// [
//   {
//     type: "WHICH_COUNTRY_FOR_GIVEN_FLAG",
//     flagSrc: "https://www.countryflags.io/bb/flat/64.png",
//     title: "Which country does this flag belongs to?",
//     correctAnswer: "Barbados",
//     options: ["Mayotte", "Mali", "Kazakhstan", "Barbados"],
//   },
//   {
//     type: "WHICH_COUNTRY_FOR_GIVEN_CAPITAL",
//     title: "Kingston is the capital of",
//     correctAnswer: "Norfolk Island",
//     options: ["Barbados", "Norfolk Island", "Kuwait", "Tanzania"],
//   },
// ];
```

#### (param) Options:

You are also able to choose what types of question to **select** or **exclude** when using `generateQuiz`, as an alternative for above fully mixed questions array.

```js
import { generateQuiz } from "country-quiz-generator";

const myQuizWithOnlyFlagQuestions = generateQuiz(2, {
  questionTypesToSelect: ["whichCountryForGivenFlag"],
});

const myQuizWithoutLanguageQuestions = generateQuiz(2, {
  questionTypesToExclude: ["whichCountryForGivenLanguage"],
});
```

### Generate one question - `questionGenerators`:

You are free to generate only one question, instead of an array.

```js
import { questionGenerators } from "country-quiz-generator";

const flagQuestion = questionGenerators.whichCountryForGivenFlag();

// {
//   "type": "WHICH_COUNTRY_FOR_GIVEN_FLAG",
//   "flagSrc": "https://www.countryflags.io/pw/flat/64.png",
//   "title": "Which country does this flag belongs to?",
//   "correctAnswer": "Palau",
//   "options": [
//     "Palau",
//     "Turkey",
//     "Palau",
//     "Turkey"
//   ]
// }

const capitalQuestion = questionGenerators.whichCountryForGivenCapital();

// {
//   "type": "WHICH_COUNTRY_FOR_GIVEN_CAPITAL",
//   "title": "Dili is the capital of",
//   "correctAnswer": "East Timor",
//   "options": [
//     "Nicaragua",
//     "East Timor",
//     "Italy",
//     "Mexico"
//   ]
// }

const languageQuestion = questionGenerators.whichCountryForGivenLanguage();

// {
//   "type": "WHICH_COUNTRY_FOR_GIVEN_LANGUAGE",
//   "correctAnswer": "South Africa",
//   "options": [
//     "Cocos [Keeling] Islands",
//     "Sint Maarten",
//     "Slovakia",
//     "South Africa"
//   ],
//   "title": "Which one of these countries speaks Swati?"
// }
```
