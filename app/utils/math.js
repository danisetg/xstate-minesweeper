import { numbersArray } from "./array";

export const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export const nRandomNumbers = (n, min, max) => {
    const numbers = numbersArray(min, max);
    const randoms = [];
    while(n--) {
        const index = randomNumber(0, numbers.length - 1);
        randoms.push(numbers[index]);
        numbers.slice(index, 1);
    }
    return randoms;
}

export const isInRange = (n, min, max) => {
    return n >= min && n <= max;
}