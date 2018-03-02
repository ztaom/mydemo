function generator(p1x, p1y, p2x, p2y) {
    var ZERO_LIMIT = 1e-6;
    // Calculate the polynomial coefficients,
    // implicit first and last control points are (0,0) and (1,1).
    var ax = 3 * p1x - 3 * p2x + 1,
        bx = 3 * p2x - 6 * p1x,
        cx = 3 * p1x;

    var ay = 3 * p1y - 3 * p2y + 1,
        by = 3 * p2y - 6 * p1y,
        cy = 3 * p1y;

    function sampleCurveDerivativeX(t) {
        // `ax t^3 + bx t^2 + cx t' expanded using Horner 's rule.
        return (3 * ax * t + 2 * bx) * t + cx;
    }

    function sampleCurveX(t) {
        return ((ax * t + bx) * t + cx ) * t;
    }

    function sampleCurveY(t) {
        return ((ay * t + by) * t + cy ) * t;
    }

    // Given an x value, find a parametric value it came from.
    function solveCurveX(x) {
        var t2 = x,
            derivative,
            x2;

        // https://trac.webkit.org/browser/trunk/Source/WebCore/platform/animation
        // First try a few iterations of Newton's method -- normally very fast.
        // http://en.wikipedia.org/wiki/Newton's_method
        for (var i = 0; i < 8; i++) {
            // f(t)-x=0
            x2 = sampleCurveX(t2) - x;
            /* istanbul ignore if */
            if (Math.abs(x2) < ZERO_LIMIT) {
                return t2;
            }
            derivative = sampleCurveDerivativeX(t2);
            // == 0, failure
            /* istanbul ignore if */
            if (Math.abs(derivative) < ZERO_LIMIT) {
                break;
            }
            t2 -= x2 / derivative;
        }

        // Fall back to the bisection method for reliability.
        // bisection
        // http://en.wikipedia.org/wiki/Bisection_method
        var t1 = 1,
            t0 = 0;
        t2 = x;
        while (t1 > t0) {
            x2 = sampleCurveX(t2) - x;
            /* istanbul ignore next */
            if (Math.abs(x2) < ZERO_LIMIT) {
                return t2;
            }
            /* istanbul ignore next */
            if (x2 > 0) {
                t1 = t2;
            /* istanbul ignore next */
            } else {
                t0 = t2;
            }
            t2 = (t1 + t0) / 2;
        }

        // Failure
        /* istanbul ignore next */
        return t2;
    }

    function solve(x) {
        return sampleCurveY(solveCurveX(x));
    }

    return solve;
}

export default class CubicBezier {
    /*
     * create a function of cubic-bezier
     * @param  {number} p1x the x coord of first control point
     * @param  {number} p1y the y coord of first control point
     * @param  {number} p2x the x coord of second control point
     * @param  {number} p2y the y coord of second control point
     */
    constructor(p1x, p1y, p2x, p2y) {
        this._curve = generator(p1x, p1y, p2x, p2y);
    }

    /**
     * get y with x
     * @param  {number} x
     * @return {number} y
     */
    y(x) {
        return this._curve(x);
    }
}