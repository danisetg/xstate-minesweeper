import { isInRange } from "./math";

export const arr2DSteps = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

export const createArray2D = (rows, columns, initialValue) => {
    return Array.from({length: rows}).map(() => Array.from({length: columns}).map(() => ({...initialValue})));
}

export const numbersArray = (min, max) => {
    return Array.from(Array(max - min + 1).keys()).map(n => n + min);
}

export const getNeighbours = (array2D, row, column) => {
    return arr2DSteps.reduce((neighbours, step) => {
        const i = row + step[0];
        const h = column + step[1];
        if (isInRange(i, 0, array2D.length - 1) && isInRange(h, 0, array2D[row].length - 1)) {
            neighbours.push(array2D[i][h]);
        }
        return neighbours;
    }, []);
}