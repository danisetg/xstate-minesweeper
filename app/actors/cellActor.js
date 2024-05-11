import { createActor } from "xstate"
import { cellMachine } from "../machines/cellMachine"

const createCellActor = (input) => {
    const actor = createActor(cellMachine, { input });
    return {
        start: () => actor.start(),
        stop: () => actor.stop(),
        open: () => actor.send({ type: 'OPEN' })
    }
}

export default createCellActor;