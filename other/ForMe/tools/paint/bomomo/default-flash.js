/* By Philipp Lenssen, Nikolai Kordulla bomomo.com */

var misc = new MiscLibrary();
var app = new App();

window.onload = init;

var flash;
var type;

function init()
{
    var movieName = "bomomo";
    var isIE = navigator.appName.indexOf("Microsoft") != -1;
    flash = (isIE) ? window[movieName] : document[movieName];
    type = 1;
}

function buttonClicked(n)
{
    flash.buttonClicked(n);

    for (var i = 1; i <= 100; i++) {
        var elm = document.getElementById('button' + i);
        if (!elm)
            break;
        if (i == n) {
            elm.style.borderLeft = '2px solid #777';
            elm.style.borderTop = '2px solid #777';
            elm.style.borderRight = '2px solid #fff';
            elm.style.borderBottom = '2px solid #fff';
            elm.style.backgroundColor = 'rgb(255,255,0)';
        }
        else {
            elm.style.borderLeft = '2px solid #fff';
            elm.style.borderTop = '2px solid #fff';
            elm.style.borderRight = '2px solid #777';
            elm.style.borderBottom = '2px solid #777';
            elm.style.backgroundColor = 'rgb(198,198,198)';
        }
    }
}

function canSave()
{
    return true
}

function saveCanvas()
{
    flash.savePicture();
}

function saveCallback(data)
{
    var elmInput = document.getElementById('canvasData');
    elmInput.value = data;
    var elmForm = document.getElementById('mainForm');
    elmForm.submit();
}

function newCanvas()
{
    // not implemented in flash yet.
    flash.clearCanvas();
}

function buttonOver(n)
{
    var elm = document.getElementById('button' + n);
    elm.style.backgroundColor = type == n ? 'rgb(0,255,255)' : 'rgb(255,255,0)';
}

function buttonOut(n)
{
    var elm = document.getElementById('button' + n);
    elm.style.backgroundColor = type == n ? 'rgb(255,255,0)' : 'rgb(198,198,198)';
}


function showMenu() {
    if (app.menuTimeout != 0) {
        clearTimeout(app.menuTimeout);
    }
    misc.showElm('menu');
}

function closeMenuDelay() {
    if (app.menuTimeout != 0) {
        clearTimeout(app.menuTimeout);
    }
    app.menuTimeout = setTimeout('closeMenu()', 300);
}

function overMenu() {
    if (app.menuTimeout != 0) {
        clearTimeout(app.menuTimeout);
        app.menuTimeout = 0;
    }
}

function closeMenu() {
    misc.hideElm('menu');
    app.menuTimeout = 0;
}


function MiscLibrary() {
}

MiscLibrary.prototype.showElm = function(id) {
    var elm = document.getElementById(id);
    if (elm) { elm.style.display = 'block'; }
}

MiscLibrary.prototype.hideElm = function(id) {
    var elm = document.getElementById(id);
    if (elm) { elm.style.display = 'none'; }
}

function App() {
}