/**
 * supported:
 * - width
 * - height
 * - opacity
 * - overflow
 * - transform
 * - transform-origin
 * - background-color
 * - background-image: image
 * - background-position-x
 * - background-position-y
 * - background-size
 * - background-repeat
 * working in progress:
 * - background-image: gradient
 * - border-radius (one value)
 * - border-top-left-radius
 * - border-top-right-radius
 * - border-bottom-right-radius
 * - border-bottom-left-radius
 * - clip-path
 * - color
 * - box-sizing
 * - text-align
 * - line-height
 * - font-size
 * - font-weight
 * - border-left-color
 * - border-right-color
 * - border-top-color
 * - border-bottom-color
 * - border-left-width
 * - border-right-width
 * - border-top-width
 * - border-bottom-width
 * - border-left-style
 * - border-right-style
 * - border-top-style
 * - border-bottom-style
 */
export function setTransform({style, rect, render}) {
    const {
        width,
        height,
        left,
        top
    } = rect;

    let [ox, oy] = style.get('transform-origin').split(' ');

    if (ox && ox.match(/%$/)) {
        ox = parseFloat(ox) / 100 * width;
    } else {
        ox = parseFloat(ox) || (width / 2);
    }

    if (oy.match(/%$/)) {
        oy = parseFloat(oy) / 100 * height;
    } else {
        oy = parseFloat(oy);
    }

    const m3 = style.get('transform')
                        .match(/matrix3d\(([^()]+)\)/)[1]
                        .split(',').map(i => parseFloat(i));

    const m2 = [m3[0], m3[1], m3[4], m3[5], m3[12] + left, m3[13] + top];

    render.translate(ox, oy);
    render.transform(...m2);
    render.translate(-ox, -oy);
}

export function setOpacity({style, render}) {
    const opacity = parseFloat(style.get('opacity'));
    render.globalAlpha = opacity;
}

function parseBackgroundSize(style, {iw, ih, cw, ch}) {
    let rw, rh;
    let matched;

    const size = style.get('background-size');
    if (size === 'contain') {
        if (iw / ih > cw / ch) {
            rw = cw;
            rh = cw / iw * ih;
        } else {
            rh = ch;
            rw = ch / ih * iw;
        }
    } else if (size === 'cover') {
        if (iw / ih > cw / ch) {
            rh = ch;
            rw = ch / ih * iw;
        } else {
            rw = cw;
            rh = cw / iw * ih;
        }
    } else if ((matched = size.match(/([\-\.\d]+)(px|%)(?:\s+([\-\.\d]+)(px|%))?/))) {
        const [, v1, u1, v2, u2] = matched;
        if (u1 === '%') {
            rw = cw * parseFloat(v1) / 100;
        } else if (u1 === 'px') {
            rw = parseFloat(v1);
        }

        if (!v2 || !u2) {
            rh = rw / iw * ih;
        } else {
            if (u2 === '%') {
                rh = ch * parseFloat(v2) / 100;
            } else if (u2 === 'px') {
                rh = parseFloat(v2);
            }
        }
    }

    return {
        rw, rh
    };
}

function praseBackgroundPosition(style, {cw, ch, rw, rh}) {
    let px = '0px', py = '0px';
    if (style.has('background-position')) {
        const position = style.get('background-position');
        let matched;

        if ((matched = position.match(/(left|center|right)(?:\s+(top|center|bottom))?/))) {
            // eslint-disable-next-line
            let [, v1, v2] = matched;

            px = v1 === 'left' ? '0%'
                            : v1 === 'center' ? '50%'
                            : '100%';

            if (!v2) {
                v2 = 'center';
            }

            py = v2 === 'top' ? '0%'
                            : v2 === 'center' ? '50%'
                            : '100%';
        } else if ((matched = position.match(/([\-\.\d]+)(px|%)(?:\s+([\-\.\d]+)(px|%))?/))) {
            const [, v1, u1, v2, u2] = matched;
            px = `${v1}${u1}`;

            if (!v2 || !u2) {
                py = '50%';
            } else {
                py = `${v2}${u2}`;
            }
        }
    }


    if (style.has('background-position-x')) {
        px = style.get('background-position-x');
    }

    if (style.has('background-position-y')) {
        py = style.get('background-position-y');
    }

    if (px.match(/px$/)) {
        px = parseFloat(px);
    } else if (px.match(/%$/)) {
        px = (cw - rw) * parseFloat(px) / 100;
    }

    if (py.match(/px$/)) {
        py = parseFloat(py);
    } else {
        py = (ch - rh) * parseFloat(py) / 100;
    }

    return {
        px,
        py
    };
}

function parseBackgroundRepeat(style, {iw, ih, cw, ch, rw, rh, px, py}) {
    const params = [];
    const repeat = style.get('background-repeat');

    function getParams(px, py) {
        let sx = 0, sy = 0, sw, sh;
        let dx = 0, dy = 0, dw, dh;

        if (rw > cw) {
            sw = iw / rw * cw;
            dw = cw;
        } else {
            sw = iw;
            dw = rw;
        }

        if (rh > ch) {
            sh = ih / rh * ch;
            dh = ch;
        } else {
            sh = ih;
            dh = rh;
        }

        if (px < 0) {
            sx = -px * iw / rw;
            dx = 0;
        } else {
            sx = 0;
            dx = px;

            if (px + dw > cw) {
                sw -= (px + dw - cw) * iw / rw;
                dw -= (px + dw - cw);
            }
        }

        if (py < 0) {
            sy = -py * ih / rh;
            dy = 0;
        } else {
            sy = 0;
            dy = py;

            if (py + dh > ch) {
                sh -= (py + dh - ch) * ih / rh;
                dh -= (py + dh - ch);
            }
        }

        return [sx, sy, sw, sh, dx, dy, dw, dh];
    }

    if (repeat === 'no-repeat') {
        params.push(getParams(px, py));
    } else if (repeat === 'repeat-x') {
        let x;

        if (px > 0) {
            x = px % rw - rw;
        } else {
            x = px;
        }

        while (x < cw) {
            params.push(getParams(x, py));
            x += rw;
        }
    } else if (repeat === 'repeat-y') {
        let y;

        if (py > 0) {
            y = py % rh - rh;
        } else {
            y = py;
        }

        while (y < ch) {
            params.push(getParams(px, y));
            y += rh;
        }
    } else if (repeat === 'repeat') {
        let x, y;

        if (px > 0) {
            x = px % rw - rw;
        } else {
            x = px;
        }

        while (x < cw) {

            if (py > 0) {
                y = py % rh - rh;
            } else {
                y = py;
            }

            while (y < ch) {
                params.push(getParams(x, y));
                y += rh;
            }

            x += rw;
        }
    }

    return params;
}

export function setBackground({style, rect, render}) {
    if (style.has('background-color')) {
        render.fillStyle = style.get('background-color');
        render.fillRect(0, 0, Math.floor(rect.width), Math.floor(rect.height));
    }

    if (style.has('background-image')) {
        const image = style.get('background-image');
        if (!(image instanceof Image) &&
                !(image instanceof HTMLImageElement)) {
            throw new Error('Please set "background-image" with a Image Object in Canvas Engine');
        }

        const {width: iw, height: ih} = image;
        const {width: cw, height: ch} = rect;
        const {rw, rh} = parseBackgroundSize(style, {iw, ih, cw, ch});
        const {px, py} = praseBackgroundPosition(style, {iw, ih, cw, ch, rw, rh});
        const repeats = parseBackgroundRepeat(style, {iw, ih, cw, ch, rw, rh, px, py});

        repeats.forEach(([
            sx, sy, sw, sh,
            dx, dy, dw, dh
        ]) => {
            render.drawImage(image, Math.floor(sx), Math.floor(sy), Math.floor(sw), Math.floor(sh), Math.floor(dx), Math.floor(dy), Math.floor(dw), Math.floor(dh));
        });
    }
}