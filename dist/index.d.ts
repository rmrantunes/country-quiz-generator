export declare const generateQuiz: (amount: number, options?: import("./types/question").GenerateQuizOptions<"whichCountryForGivenCapital" | "whichCountryForGivenFlag" | "whichCountryForGivenLanguage"> | undefined) => import("./types/question").Question[], questionGenerators: {
    whichCountryForGivenCapital: () => import("./types/question").Question;
    whichCountryForGivenFlag: () => import("./types/question").Question;
    whichCountryForGivenLanguage: () => import("./types/question").Question;
};
