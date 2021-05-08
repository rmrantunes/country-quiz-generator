export declare enum QuestionType {
    WHICH_COUNTRY_FOR_GIVEN_CAPITAL = "WHICH_COUNTRY_FOR_GIVEN_CAPITAL",
    WHICH_COUNTRY_FOR_GIVEN_FLAG = "WHICH_COUNTRY_FOR_GIVEN_FLAG",
    WHICH_COUNTRY_FOR_GIVEN_LANGUAGE = "WHICH_COUNTRY_FOR_GIVEN_LANGUAGE"
}
export interface Question {
    type?: QuestionType;
    flagSrc?: string;
    title: string;
    correctAnswer: string;
    options: string[];
}
