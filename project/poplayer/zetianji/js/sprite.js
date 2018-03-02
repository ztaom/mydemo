/**
 * spriteGroup
 *
 * @example
 * createAnimation(element, sprite(options))
 *
 */
function sprite(options) {
    return function(effect, element) {
        const img = options.img;
        let imgOrderArr = options.imgOrderArr;
        const imgFrameNum = options.imgFrameNum;
        const duration = options.duration;
        const times = options.times;
        const func = options.func;
        let imgWidth = element.width;
        if (imgOrderArr === undefined) {
            imgOrderArr = [];
            for (let n = 0; n < imgFrameNum; n++) {
                imgOrderArr.push(n + 1);
            }
        }

        element.style.set('background-repeat', 'no-repeat');
        element.style.set('background-size', `${imgFrameNum * 100}% 100%`);
        element.style.set('background-position', '0px 0px');

        if (img instanceof HTMLImageElement) {
            element.style.set('background-image', img);
        } else if (typeof img === 'string') {
            element.style.set('background-image', 'url(' + img + ')');
        }

        for (let i = 0; i < imgOrderArr.length; i++) {
            effect
                .css({
                    'background-position': '-' + (imgOrderArr[i] - 1) * imgWidth + 'px 0px '
                })
                .delay(duration / imgOrderArr.length)
                .loopAll(times);
            if (func) {
                func(effect, i + 1);
            }
            if (i !== imgOrderArr.length - 1) {
                effect.then();
            }
            else {
                effect.then()
                    .delay(duration / imgOrderArr.length)
                    .loopAll(times);
            }
        }
        return effect;
    }
}
