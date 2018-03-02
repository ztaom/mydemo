import Map from 'babel-runtime/core-js/map';
import fromObject from './object';

const proxies = new Map();

function from(sth) {
    for (const [proxy, detect] of proxies) {
        if (detect(sth)) {
            return proxy(sth);
        }
    }
    return fromObject(sth);
}

export {
    proxies,
    from
};