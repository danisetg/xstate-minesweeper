import { setup } from "xstate";

export const minesweeperMachine = setup({
    
}).createMachine({
    context: ({ input }) => ({
        cellActors: input.cellActors
    }),
    initial: 'Playing',
    states: {
        Playing: {
            on: {
                GAMEOVER: 'GameOver'
            }
        },
        GameOver: {}
    }
})