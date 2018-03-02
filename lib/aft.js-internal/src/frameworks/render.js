import {
    Element,
    Font,
    Group,
    Image,
    Rectangle,
    Circle,
    Ellipse,
    Triangle
} from '../elements';
import {
    Engine,
    CSS2D,
    Canvas2D
} from '../engines';
import Scene from '../core/scene';
import fromElement from '../proxies/element';
import {
    ElementEffects
} from '../effects';
import {
    extendProxy,
    extendEffect
} from '../core/factory';

extendProxy(fromElement, (sth) => sth instanceof Element);
extendEffect(ElementEffects);

export {
    Element,
    Font,
    Group,
    Image,
    Rectangle,
    Circle,
    Ellipse,
    Triangle,
    Engine,
    CSS2D,
    Canvas2D,
    Scene
};