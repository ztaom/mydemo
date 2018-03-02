import Map from 'babel-runtime/core-js/map';
import CubicBezier from '../libs/cubicbezier';

const easing = new Map();
easing.set('linear', x => x);

const ease = new CubicBezier(.25, .1, .25, 1);
easing.set('ease', x => ease.y(x));

const easeIn = new CubicBezier(.42, 0, 1, 1);
easing.set('ease-in', x => easeIn.y(x));

const easeOut = new CubicBezier(0, 0, .58, 1);
easing.set('ease-out', x => easeOut.y(x));

const easeInOut = new CubicBezier(.42, 0, .58, 1);
easing.set('ease-in-out', x => easeInOut.y(x));

const bounceIn = new CubicBezier(.42, 0, .5, 1.5);
easing.set('bounce-in', x => bounceIn.y(x));

const bounceOut = new CubicBezier(.5, -0.5, .58, 1);
easing.set('bounce-out', x => bounceOut.y(x));

const bounceInOut = new CubicBezier(.5, -0.5, .5, 1.5);
easing.set('bounce-in-out', x => bounceInOut.y(x));

export default easing;