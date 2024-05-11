import { configurations } from "../config";
import { createArray2D, getNeighbours } from "../utils/array";
import { createDiv } from "../utils/dom";
import { nRandomNumbers } from "../utils/math";
import createCell from "./cell";

const initialize = (board, configuration) => {
    const mines = nRandomNumbers(configuration.minesNumber, 0, configuration.height * configuration.width - 1);
    mines.forEach(index => {
        const row = Math.floor(index / configuration.width);
        const column = index%configuration.height;
        board[row][column].hasMine = true;
        getNeighbours(board, row, column).map(neighbour => neighbour.neighbourMines++);
    });
}

const createElement = (cells) => {
    const element = createDiv({ className: 'minesweeper-board' });
    cells.forEach(row => {
        const cellsRow = createDiv({ className: 'minesweeper-board-row' });
        row.forEach(cell => cellsRow.append(cell.element));
        element.append(cellsRow);
    });
    return element;
}

const createBoard = (difficulty) => {
    const configuration = configurations[difficulty];
    const board = createArray2D(configuration.height, configuration.width, { hasMine: false, neighbourMines: 0 });
    initialize(board, configuration);
    const cells = board.map(row => row.map(createCell));
    const element = createElement(cells);
    return {
        render: (renderTarget) => renderTarget.append(element),
        cellActors: cells.map(cell => cell.actor)
    }
}

export default createBoard;