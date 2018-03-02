import sinon from 'sinon';
import now from 'performance-now';

function timeout(fn, ex, ...args) {
    const last = now() >>> 0;
    function im() {
        var ac = now() - last;
        ac >= ex ? fn(...args) : setImmediate(im);
    }
    setImmediate(im);
}

export function delay(expectTime) {
    return (fn) =>
        new Promise((resolve, reject) => {
            const last = now() >>> 0;
            timeout(() => {
                const actualTime = (now() >>> 0) - last;
                const offsetTime = actualTime - expectTime;
                try {
                    const res = fn({
                        actualTime,
                        expectTime,
                        offsetTime
                    });
                    resolve(res);
                } catch (err) {
                    reject(err);
                }
            }, expectTime);
        }
    );
}

export function curry(fn) {
    return a1 => a2 => fn(a1, a2);
}

export class Clock {
    constructor() {
        this.delta = 0;
        this.elapsed = 0;
    }

    add(n) {
        this.delta = n;
        this.elapsed += n;
    }

    go(n) {
        this.delta = n - this.elapsed;
        this.elapsed = n;
    }
}

const HTMLElementContainer = new Map();
export class HTMLElement {
    constructor(tagName = 'div') {
        const cssTextStub = sinon.stub();

        this.tagName = tagName;
        this.nodeType = 1;
        this.style = {};
        this.children = [];
        this.attributes = new Map();

        let cssText = '';
        Object.defineProperty(this.style, 'cssText', {
            get() {
                return cssText;
            },

            set(value) {
                cssTextStub(value);
                cssText = value;
            }
        });

        let textContent = '';
        Object.defineProperty(this, 'textContent', {
            get() {
                return textContent;
            },

            set(value) {
                textContent = value;
            }
        });

        let innerHTML = '';
        Object.defineProperty(this, 'innerHTML', {
            get() {
                return innerHTML;
            },

            set(value) {
                innerHTML = value;
                if (value === '') {
                    textContent = '';
                }
            }
        });

        if (tagName === 'canvas') {
            Object.defineProperty(this, 'getContext', {
                value: () => Object.create(null)
            });
        }

        this._cssTextStub = cssTextStub;
    }

    get childNodes() {
        return this.children;
    }

    appendChild(el) {
        const id = el.getAttribute('id');
        if (id) {
            HTMLElementContainer.set(id, el);
        }

        if (this.children.indexOf(el) < 0) {
            if (el instanceof DocumentFragment) {
                el.childNodes.forEach(child => this.appendChild(child));
            } else {
                this.children.push(el);
                el.parentNode = this;
            }
        }
    }

    removeChild(el) {
        const id = el.getAttribute('id');
        if (id) {
            HTMLElementContainer.delete(id);
        }

        const index = this.children.indexOf(el);
        if (index > -1) {
            this.children.splice(index, 1);
        }
        el.parentNode = void 0;
    }

    getAttribute(attr) {
        return this.attributes.get(attr);
    }

    setAttribute(attr, value) {
        this.attributes.set(attr, value);
    }

    removeAttribute(attr) {
        this.attributes.delete(attr);
    }
}

HTMLElement.Container = HTMLElementContainer;

export class DocumentFragment extends HTMLElement {}

export class Image {}

export class HTMLImageElement {}

export function getComputedStyle(element) {
    return element.style;
}

export const document = {
    createElement(tagName) {
        return new HTMLElement(tagName);
    }
};