import './style.scss';
import createBoard from "./components/board";
import { createDiv } from './utils/dom';
import { createActor } from 'xstate';
import createMinesweeperActor from '../actors/minesweeperActor';

const createGameArea = () =>{
    const gameArea = createDiv({ className: 'minesweeper-game' });
    gameArea.setAttribute('oncontextmenu', 'return false');
    return gameArea;
}

export const createMinesweeper = (difficulty = 0) => {
    const gameArea = createGameArea();
    const gameHeader = createDiv({ className: 'minesweeper-game-header' });
    const board = createBoard(difficulty);
    const actor = createMinesweeperActor({
        cellActors: board.cellActors
    });
    actor.start();
    gameArea.append(gameHeader);
    board.render(gameArea);

    return {
        render: (renderTarget) => renderTarget.append(gameArea)
    };
}

const game = createMinesweeperGame();
game.render(document.getElementById('app'));
export default createMinesweeperGame;