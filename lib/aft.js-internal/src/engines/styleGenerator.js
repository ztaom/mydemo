import Map from 'babel-runtime/core-js/map';
import Vec3 from '../libs/vec3';
import {
    deg2rad
} from '../libs/math';

function transformCoords(position, canvasSize) {
    const x = canvasSize.width / 2;
    const y = canvasSize.height / 2;
    const vec3 = new Vec3(x, y, position.z);
    vec3.add([position.x, -position.y, 0]);
    return vec3;
}

const PxValueRegEx = /[-\d\.]+px/g;

function scalingStyleValue(styleMap, scale) {
    styleMap.forEach((value, name) => {
        if (typeof value === 'string') {
            const matched = value.match(PxValueRegEx);
            if (matched) {
                matched.forEach(n => {
                    const v = parseFloat(n) * scale;
                    value = value.replace(n, `${v}px`);
                });
                styleMap.set(name, value);
            }
        }
    });
}

function generateRectangleStyle(element, canvasSize) {
    const {width, height, left, top} = element.getBoundingRect();
    const {x, y} = transformCoords(
        new Vec3(left, top),
        canvasSize
    );

    const map = new Map([
        ['overflow', 'hidden'],
        ['width', `${width}px`],
        ['height', `${height}px`],
        ['left', `${x}px`],
        ['top', `${y}px`]
    ]);
    if (element.position.z) {
        map.set('z-index', `${element.position.z}`);
    }
    return map;
}

function generateCircleStyle(element, canvasSize) {
    const {radius} = element;
    const {width, height, left, top} = element.getBoundingRect();
    const {x, y} = transformCoords(
        new Vec3(left, top),
        canvasSize
    );

    const map = new Map([
        ['overflow', 'hidden'],
        ['width', `${width}px`],
        ['height', `${height}px`],
        ['left', `${x}px`],
        ['top', `${y}px`],
        ['clip-path', `circle(${radius}px)`]
    ]);
    if (element.position.z) {
        map.set('z-index', `${element.position.z}`);
    }
    return map;
}

function generateEllipseStyle(element, canvasSize) {
    const {hRadius, vRadius} = element;
    const {width, height, left, top} = element.getBoundingRect();
    const {x, y} = transformCoords(
        new Vec3(left, top),
        canvasSize
    );

    const map = new Map([
        ['overflow', 'hidden'],
        ['width', `${width}px`],
        ['height', `${height}px`],
        ['left', `${x}px`],
        ['top', `${y}px`],
        ['clip-path', `ellipse(${hRadius}px ${vRadius}px)`]
    ]);
    if (element.position.z) {
        map.set('z-index', `${element.position.z}`);
    }
    return map;
}

function generateTriangleStyle(element, canvasSize) {
    const {theta} = element;
    const {width, height, left, top} = element.getBoundingRect();
    const {x, y} = transformCoords(
        new Vec3(left, top),
        canvasSize
    );

    const map = new Map([
        ['overflow', 'hidden'],
        ['width', `${width}px`],
        ['height', `${height}px`],
        ['left', `${x}px`],
        ['top', `${y}px`],
        ['clip-path', `polygon(0px ${height}px, ${width}px ${height}px, ${height/Math.tan(deg2rad(theta))}px 0px)`]
    ]);
    if (element.position.z) {
        map.set('z-index', `${element.position.z}`);
    }
    return map;
}

function generateGroupStyle(element, canvasSize) {
    const {width, height, left, top} = element.getBoundingRect();
    const {x, y} = transformCoords(
        new Vec3(left, top),
        canvasSize
    );

    let overflow = 'visible';
    if (width && height) {
        overflow = 'hidden';
    }

    const map = new Map([
        ['overflow', overflow],
        ['width', `${width}px`],
        ['height', `${height}px`],
        ['left', `${x}px`],
        ['top', `${y}px`]
    ]);
    if (element.position.z) {
        map.set('z-index', `${element.position.z}`);
    }
    return map;
}

function generateFontStyle(element, canvasSize) {
    const {width, height, left, top} = element.getBoundingRect();
    const {x, y} = transformCoords(
        new Vec3(left, top),
        canvasSize
    );

    const [hAlign, vAlign] = element.textAlign.split(' ');
    let lineHeight;

    if (!element.style.has('line-height')) {
        const fontSize = parseInt(element.style.get('font-size'));

        switch (vAlign) {
            case 'center':
                lineHeight = height;
                break;
            case 'bottom':
                lineHeight = height * 2 - fontSize;
                break;
            case 'top':
            default:
                lineHeight = fontSize;
                break;
        }
    } else {
        lineHeight = element.style.get('line-height');
    }

    const map = new Map([
        ['overflow', 'visible'],
        ['text-align', hAlign],
        ['line-height', `${lineHeight}px`],
        ['width', `${width}px`],
        ['height', `${height}px`],
        ['left', `${x}px`],
        ['top', `${y}px`]
    ]);
    if (element.position.z) {
        map.set('z-index', `${element.position.z}`);
    }
    return map;
}

export default function generateStyle(element, canvasSize, scale = 1) {
    const matrix = element.transform.toMatrix(item => {
        if (['translateY',
                'rotateZ',
                'skewY'
            ].indexOf(item[0]) > -1) {
            const unit = String(item[1]).match(/^([\d\.\-]+)([a-z%]+)?$/);
            if (unit) {
                item[1] = -parseFloat(unit[1]) + (unit[2] || '');
            }
        }

        return item;
    });

    if (scale !== 1) {
        matrix[12] /= scale;
        matrix[13] /= scale;
    }

    const matrixText = `matrix3d(${matrix.join(',')})`;
    const commonStyle = new Map([
        ['box-sizing', 'border-box'],
        ['position', 'absolute'],
        ['-webkit-transform', matrixText],
        ['-ms-transform', matrixText],
        ['-moz-transform', matrixText],
        ['transform', matrixText],
        ['-webkit-transform-origin', '50% 50% 0'],
        ['-ms-transform-origin', '50% 50% 0'],
        ['-moz-transform-origin', '50% 50% 0'],
        ['transform-origin', '50% 50% 0'],
        ['will-change', 'auto']
    ]);

    const customStyle = element.style.normalize();

    let shapeStyle;

    switch (element.className) {
        case 'Circle':
            shapeStyle = generateCircleStyle(element, canvasSize);
            break;
        case 'Ellipse':
            shapeStyle = generateEllipseStyle(element, canvasSize);
            break;
        case 'Triangle':
            shapeStyle = generateTriangleStyle(element, canvasSize);
            break;
        case 'Group':
            shapeStyle = generateGroupStyle(element, canvasSize);
            break;
        case 'Font':
            shapeStyle = generateFontStyle(element, canvasSize);
            break;
        case 'SmartImage':
        case 'Rectangle':
        default:
            shapeStyle = generateRectangleStyle(element, canvasSize);
            break;
    }

    const styleMap = new Map([
        ...commonStyle,
        ...customStyle,
        ...shapeStyle
    ]);

    if (scale !== 1) {
        scalingStyleValue(styleMap, 1 / scale);
    }

    return styleMap;
}