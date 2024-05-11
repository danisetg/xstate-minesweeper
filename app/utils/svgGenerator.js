const namespace = 'http://www.w3.org/2000/svg';

export const setAttributes = (el, attributes) => {
    Object.keys(attributes).forEach((key) => {
        el.setAttribute(key, attributes[key]);
    });
}

export const setStyles = (el, styles) => {
    Object.keys(styles).forEach((key) => {
        el.style[key] = styles[key];
    });
}

export const svgElementBuilder = (svgTag) => ({ attributes, styles }) => {
    const el = document.createElementNS(namespace, svgTag);
    attributes && setAttributes(el, attributes);
    styles && setStyles(el, styles);
    return el; 
}

export const drawSvg = svgElementBuilder('svg');
export const drawRect = svgElementBuilder('rect');
export const drawCircle = svgElementBuilder('circle');
export const drawPolygon = svgElementBuilder('polygon');

const drawMineRect = (angle) => {
    return drawRect({
        attributes: {  width: '4', height: '28', x: '18', y: '6' },
        styles: {
            transformBox: 'fill-box',
            transformOrigin: 'center',
            transform: `rotate(${angle}deg)`
        }
    });
}

export const drawMine = () => {
    const mine = drawSvg({
        attributes: {
            width: 40,
            height: 40,
            viewBox: '0 0 40 40'
        }
    });
    Array(4).keys().forEach(key => {
        mine.append(drawMineRect(key*45));
    });
    mine.append(drawCircle({
        attributes: { fill: 'black', r: '10', cx: '20', cy: '20' }
    }));
    mine.append(drawRect({
        attributes: { width: '4', height: '4', x: '15', y: '15', fill: 'white' }
    }));
    return mine;
}

export const drawFlag = () => {
    const flag = drawSvg({
        attributes: { viewBox: '0 0 40 40' }
    });
    flag.append(drawRect({
        attributes: { width: '4', height: '22', x: '18', y: '5', fill: 'black' }
    }));
    flag.append(drawPolygon({
        attributes: { points: '22,5 22,25 5,15', fill: 'red' }
    }));
    flag.append(drawRect({
        attributes: { width: '18', height: '4', x: '11', y: '27', fill: 'black' }
    }));
    flag.append(drawRect({
        attributes: { width: '30', height: '4', x: '5', y: '31', fill: 'black' }
    }));
    return flag;
}