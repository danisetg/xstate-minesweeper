import { addClass, createDiv, createSpan, removeClass } from "../utils/dom"
import createCellActor from "../actors/cellActor";
import { drawFlag, drawMine } from "../utils/svgGenerator";

const open = ({ hasMine, neighbourMines, element }) => {
    addClass(element, 'opened');
    if (hasMine) {
        element.append(drawMine());
        return;
    }
    const content = createSpan({ className: 'minesweeper-cell-content' });
    content.innerText = neighbourMines;
    addClass(content, `color${neighbourMines}`);
    element.append(content);
}

const addFlag = (element) => element.append(drawFlag());
const removeFlag = (element) => element.getElementsByTagName('svg')[0].remove();

const press = (element) => addClass(element, 'pressed');
const unpress = (element) => removeClass(element, 'pressed');

const createCell = (input) => {
    const element = createDiv({ className: 'mineswepper-cell' });
    const actor = createCellActor({ ...input, element, open, press, unpress, addFlag, removeFlag });
    actor.start();
    return { element, actor };
}

export default createCell;