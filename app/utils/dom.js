export const addStyles = (element, styles) => {
    Object.keys(styles).forEach(key => {
        element.style[key] = styles[key];
    });
}

export const addClass = (element, className) => {
    element.classList.add(className);
}

export const removeClass = (element, className) => {
    element.classList.remove(className);
}

export const createElement = (tagName, { styles, className }) => {
    const el = document.createElement(tagName);
    styles && addStyles(el, styles);
    className && addClass(el, className);
    return el;
} 

export const createDiv = ({ styles, className }) => {
    return createElement('div', { styles, className });
} 

export const createSpan = ({ styles, className }) => {
    return createElement('span', { styles, className });
}