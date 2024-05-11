import { createActor } from "xstate"
import { minesweeperMachine } from "../machines/minesweeperMachine";

const createMinesweeperActor = (input) => {
    const actor = createActor(minesweeperMachine, { input });
    return {
        start: () => actor.start(),
        stop: () => actor.stop()
    }
}

export default createMinesweeperActor;