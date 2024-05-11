import { fromCallback, sendParent, setup } from "xstate";


const mousedownActor = fromCallback(({ sendBack, input }) => {
    const onMousedown = (event) => {
        if (event.button === 0) {
            sendBack({ type: 'PRESS' });
        }
    }
    const onMouseover = (event) => {
        if (event.buttons === 1) {
            sendBack({ type: 'PRESS' });
        }
    }
    input.element.addEventListener('mousedown', onMousedown);
    input.element.addEventListener('mouseover', onMouseover);
    return () =>{ 
        input.element.removeEventListener('mousedown', onMousedown);
        input.element.removeEventListener('mouseover', onMouseover);
    }
});

const mouseupActor = fromCallback(({ sendBack, input }) => {
    const onMouseup = () => sendBack({ type: 'OPEN' });
    input.element.addEventListener('mouseup', onMouseup);
    return () => input.element.removeEventListener('mouseup', onMouseup);
});

const mouseoutActor = fromCallback(({ sendBack, input }) => {
    const onMouseout = () => sendBack({ type: 'UNPRESS' });
    input.element.addEventListener('mouseout', onMouseout);
    return () => input.element.removeEventListener('mouseout', onMouseout);
});

const rightClickActor = fromCallback(({ sendBack, input }) => {
    const onRightClick = () => sendBack({ type: 'TOGGLE_FLAG' });
    input.element.addEventListener('contextmenu', onRightClick);
    return () => input.element.removeEventListener('contextmenu', onRightClick);
});

const openAction = ({ context }) => context.open({ 
    element: context.element, 
    neighbourMines: context.neighbourMines,
    hasMine: context.hasMine
});

const pressAction = ({ context }) => context.press(context.element);
const unpressAction = ({ context }) => context.unpress(context.element);
const addFlagAction = ({ context}) => context.addFlag(context.element);
const removeFlagAction = ({ context}) => context.removeFlag(context.element);
export const cellMachine = setup({
    actors: { mousedownActor, mouseupActor, mouseoutActor, rightClickActor },
    actions: { openAction, pressAction, unpressAction, addFlagAction, removeFlagAction }
}).createMachine({
    initial: 'Idle',
    context: ({ input }) => ({
        hasMine: input.hasMine,
        neighbourMines: input.neighbourMines,
        element: input.element,
        open: input.open,
        press: input.press,
        unpress: input.unpress,
        addFlag: input.addFlag,
        removeFlag: input.removeFlag
    }),
    states: {
        Idle: {
            invoke: [{
                id: 'mousedown',
                src: 'mousedownActor',
                input: ({ context }) => ({ element: context.element })
            }, {
                id: 'rightClick',
                src: 'rightClickActor',
                input: ({ context }) => ({ element: context.element })
            }],
            on: {
                TOGGLE_FLAG: 'Flagged',
                PRESS: 'Pressed',
                OPEN: 'Opened'
            }
        },
        Flagged: {
            invoke: {
                id: 'rightClick',
                src: 'rightClickActor',
                input: ({ context }) => ({ element: context.element })
            },
            entry: ['addFlagAction'],
            exit: ['removeFlagAction'],
            on: { 
                TOGGLE_FLAG: 'Idle'
            }
        },
        Pressed: {
            invoke: [{
                id: 'mouseup',
                src: 'mouseupActor',
                input: ({ context }) => ({ element: context.element })
            }, {
                id: 'mouseout',
                src: 'mouseoutActor',
                input: ({ context }) => ({ element: context.element })
            }],
            entry: ['pressAction'],
            exit: ['unpressAction'],
            on: {
                OPEN: 'Opened',
                UNPRESS: 'Idle'
            }
        },
        Opened: {
            entry: [
                'openAction',
                sendParent({ type: 'CELL_OPENED' })
            ]
        }
    }
});