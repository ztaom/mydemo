
function getDPR () {
    return window.devicePixelRatio;
}
function getDomDpr () {
    return document.documentElement.getAttribute('data-dpr');
}
function getWinRem () {
    return window.rem;
}
function getRootFontSize () {
    return window.getComputedStyle(document.documentElement, null).getPropertyValue("font-size");
}
function getScreen () {
    return window.screen;
}
function getWinVP () {
    return document.documentElement.getBoundingClientRect();
}
function getMetaVP() {
    var ret = {};
    var arrs = document.querySelector('meta[name=viewport]').getAttribute('content');

    arrs = arrs.split(',');

    arrs.forEach(function (s) {
        s = s.trim();
        var sa = s.split('=');
        ret[sa[0]] = sa[1];
    });

    return ret;
}

casper.test.begin('`<meta content="maximum-dpr=2" name="flexible" />` has been setted!', 8, function suite(test) {
    //当设置了 <meta content="maximum-dpr=2" name="flexible" />
    casper.start('./test/maximum-dpr.html', function() {
        this.echo('Page Title: ' + this.getTitle());
    });

    casper.then(function () {
        var dpr = this.evaluate(getDPR); // casper webkit default pixelratio = 1

        var metavp = this.evaluate(getMetaVP);
        var domDpr = parseFloat(this.evaluate(getDomDpr));
        var rem = parseFloat(this.evaluate(getWinRem));
        var rfs = parseFloat(this.evaluate(getRootFontSize));
        var scr = this.evaluate(getScreen);
        var winVp = this.evaluate(getWinVP);

        test.assertEquals(dpr, 1, 'devicePixelRatio of casper should be `1`');
        test.assertEquals(domDpr, 2, 'RootElement `data-dpr` should be `2`');
        test.assertEquals(rem, rfs, '`window.rem` should be equal to `font-size` of RootElement');
        test.assertEquals(rem, parseFloat((winVp.width/10).toFixed(2)), '`window.rem` should be correct @casper\'s viewport')
        test.assertEquals(metavp['initial-scale'], '0.5', 'correct `initial-scale` 0.5');
        test.assertEquals(metavp['maximum-scale'], '0.5', 'correct `maximum-scale` 0.5');
        test.assertEquals(metavp['minimum-scale'], '0.5', 'correct `minimum-scale` 0.5');
        test.assertEquals(metavp['user-scalable'], 'no', 'correct `user-scalable` no');

    });

    casper.run(function () {
        test.done();
    })
});

// normal test
casper.test.begin('Normal test cases using `rem`', 8, function suite(test) {

    casper.start('./test/normal.html', function() {
        this.echo('Page Title: ' + this.getTitle());
    });

    casper.then(function () {
        var dpr = this.evaluate(getDPR); // casper webkit default pixelratio = 1

        var metavp = this.evaluate(getMetaVP);
        var domDpr = parseFloat(this.evaluate(getDomDpr));
        var rem = parseFloat(this.evaluate(getWinRem));
        var rfs = parseFloat(this.evaluate(getRootFontSize));
        var scr = this.evaluate(getScreen);
        var winVp = this.evaluate(getWinVP);

        test.assertEquals(dpr, 1, 'devicePixelRatio of casper should be `1`');
        test.assertEquals(domDpr, 1, 'RootElement `data-dpr` should be `1`');
        test.assertEquals(rem, rfs, '`window.rem` should be equal to `font-size` of RootElement');
        test.assertEquals(rem, parseFloat((winVp.width/10).toFixed(2)), '`window.rem` should be correct @casper\'s viewport')
        test.assertEquals(metavp['initial-scale'], '1', 'correct `initial-scale` 1');
        test.assertEquals(metavp['maximum-scale'], '1', 'correct `maximum-scale` 1');
        test.assertEquals(metavp['minimum-scale'], '1', 'correct `minimum-scale` 1');
        test.assertEquals(metavp['user-scalable'], 'no', 'correct `user-scalable` no');

    });

    casper.run(function () {
        test.done();
    })
});

