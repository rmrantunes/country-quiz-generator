"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomSort = exports.getRandomArrayIndex = void 0;
function getRandomArrayIndex(array) {
    return Math.floor(Math.random() * array.length);
}
exports.getRandomArrayIndex = getRandomArrayIndex;
function randomSort() {
    return Math.random() - 0.5;
}
exports.randomSort = randomSort;
