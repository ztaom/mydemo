//css
require('../css/style.css');
require('../css/main.css');
require('../less/common.less');

//javascript
//require('./component.js');

//img
var img = document.createElement('img');
img.src = require('../img/index.png');

//html
require("file?name=html.html!../index.html");