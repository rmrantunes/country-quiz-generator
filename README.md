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

### Generate a array of random questions:

Below code returns a list of mixed questions.

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

_Later you'll be able to pass an options object to choose what types of questions to generate with `generateQuiz`, as an alternative for this fully mixed questions array._

### Generate question by type:

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
