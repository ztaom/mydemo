#!/usr/bin/nodejs

var fs = require('fs');
var beautify = require("json-beautify");
var dir = __dirname;


let json = JSON.parse(fs.readFileSync(dir + '/' + 'data.json', 'utf-8').toString());
let oJson = {};

function getImageInfoByRefId(refId) { 
  let assets = json.assets;
  let res = {};
  [].forEach.call(assets, function(item) {
    if (item.id === refId) {
      res = {
        width: item.w,
        height: item.h,
        path: item.u + item.p
      }
    }
  });
  return res;
}

function getLayerInfoByRefId(refId) {
  let layers = json.layers;
  let res = {};
  [].forEach.call(assets, function(item) {
    if (item.id === refId) {
      res = item.layers;
    }
  });
  return res;
}

function getLayerInfoByInd(ind) {
  let layers = json.layers;
  let res = {};
  [].forEach.call(assets, function(item) {
    if (item.ind === ind) {
      res = item;
    }
  });
  return res;
}

function setOpacity(item, style) {
  let opacity;
  if (typeof(item.ks.o.k) === 'number') {
    opacity = item.ks.o.k / 100;
  } else {
    opacity = item.ks.o.k[0].s[0] / 100;
  }
  style['opacity'] = opacity;
}

function setTransform(item, transformArr) {
  // translate
  let translateX;
  let translateY;
  if (item.ks.p.s && item.ks.p.s === true) {
    translateX = item.ks.p.x.k;
    if (typeof(item.ks.p.y.k) === 'number') {
      translateY = item.ks.p.y.k;
    } else {
      translateY = item.ks.p.y.k[0].s[0];
    }
  } else {
    translateX = item.ks.p.k[0];
    translateY = item.ks.p.k[1];
  }
  translateX = translateX - item.width / 2;
  translateY = -(translateY - item.height / 2);
  transformArr.push(['translateX', translateX]);
  transformArr.push(['translateY', translateY]);
  // rotate
  let rotateZ;
  if (typeof(item.ks.r.k) === 'number') {
    rotateZ = item.ks.r.k;
  } else {
    rotateZ = item.ks.r.k[0].s[0];
  }
  transformArr.push(['rotateZ', -rotateZ]);
  // scale
  let scaleX;
  let scaleY;
  if (typeof(item.ks.s.k[0]) === 'number') {
    scaleX = item.ks.s.k[0];
    scaleY = item.ks.s.k[1];
  } else {
    scaleX = item.ks.s.k[0].s[0];
    scaleY = item.ks.s.k[0].s[1];
  }
  scaleX = scaleX / 100;
  scaleY = scaleY / 100;
  transformArr.push(['scaleX', scaleX]);
  transformArr.push(['scaleY', scaleY]);
}

function setOpacityChange(ks, startStyle, endStyle, item) {
  if (typeof(ks.o.k) !== 'number') {
    startStyle['opacity'] = ks.o.k[0].s[0] / 100;
    endStyle['opacity'] = ks.o.k[0].e[0] / 100;
  }
}

function setTransformChange(item, ks, startTransform, endTransform) {
  // translate
  if (ks.p.s === true) {
    if (typeof(ks.p.x.k) !== 'number') {
      startTransform.push(['translateX', ks.p.x.k[0].s[0] - item.width / 2]);
      endTransform.push(['translateX', ks.p.x.k[0].e[0] - item.width / 2]);
    }
    if (typeof(ks.p.y.k) !== 'number') {
      startTransform.push(['translateY', -(ks.p.y.k[0].s[0] - item.height / 2) ]);
      endTransform.push(['translateY', -(ks.p.y.k[0].e[0] - item.height / 2) ]);
    }
  }
  // rotate
  if (typeof(ks.r.k) !== 'number') {
    startTransform.push(['rotateZ', ks.r.k[0].s[0]]);
    endTransform.push(['rotateZ', ks.r.k[0].e[0]]);
  }
  // scale
  if (typeof(ks.s.k[0]) !== 'number') {
    startTransform.push(['scaleX', ks.s.k[0].s[0] / 100]);
    startTransform.push(['scaleY', ks.s.k[0].s[1] / 100]);
    endTransform.push(['scaleX', ks.s.k[0].e[0] / 100]);
    endTransform.push(['scaleY', ks.s.k[0].e[1] / 100]);
  }
}
// project
oJson['project'] = {
  "id": "",
  "name": "",
  "description": "",
  "stage": "stage",
  "movieClips": "mc",
  "animations": ""
}

// stage
oJson['stage'] = {
  "width": json.w / 2,
  "height": json.h / 2,
  "resize": false,
  "clearColor": ""
}

// mc
let mc = [];
let assets = json.assets;
let layers = json.layers;

// animations
let animations = {};


function setLayer(layersArr, mcArr, layerPath0) {
  [].forEach.call(layersArr, function(item, index) {
    let layerPath = layerPath0 + '_' + index;
    item.layerPath = layerPath;
    let type = item.ty;
    // style
    let transform = [];
    let style = {
      transform: transform
    };
    let width;
    let height;
    if (type === 0) {
      width = item.w;
      height = item.h;
    } else if (type === 2) {
      let imageInfo = getImageInfoByRefId(item.refId);
      style['background-size'] = `100% 100%`;
      style['background-repeat'] = `no-repeat`;
      style['background-image'] = `url(${imageInfo.path})`;
      width = imageInfo.width;
      height = imageInfo.height;
    }
    item.width = width;
    item.height = height;
    style['width'] = width;
    style['height'] = height;
    style['left'] = 0;
    style['top'] = 0;

    setOpacity(item, style);
    setTransform(item, transform);

    // children
    let children = [];
    if (type === 0) {
      setLayer(getLayerInfoByRefId(item.refId), children, layerPath);
    }
    // animation
    let animation = {};
    if (item.ks) {
      animation = {
        "ref": 'anim_' + layerPath,
        "iteraction": "infinite",
        "direction": "normal",
        "startTime": 0
      }
    }
    // animations
    if (item.ks) {
      let animationItem = [{
        "id": "anim_" + layerPath,
        "name": "anim_" + layerPath,
        "effects": []
      }];
      let startTransform = [];
      let endTransform = [];
      let startStyle = {
        transform: startTransform
      }
      let endStyle = {
        transform: endTransform
      }
      setOpacityChange(item.ks, startStyle, endStyle, item);
      setTransformChange(item, item.ks, startTransform, endTransform);
      let startJson = {
        "type": "normal",
        "style": startStyle,
        "delay": item.ip * 3,
        "duration": 0,
        "easing": "linear",
        "iteraction": 0,
        "direction": "normal"
      };
      let endJson = {
        "type": "normal",
        "style": endStyle,
        "delay": 0,
        "duration": (item.op - item.ip) * 3,
        "easing": "linear",
        "iteraction": 0,
        "direction": "normal"
      };
      animationItem[2].effects.push(startJson);
      animationItem[2].effects.push(endJson);
      animations['anim_' + layerPath] = animationItem;
    }
    // 倒序插入
    mcArr.unshift({
      "id": item.ind,
      "type": "normal",
      "name": item.nm,
      "style": style,
      "attr": {},
      "animation": animation,
      "events": [],
      "plugins": [],
      "children": children
    });
  });
}
setLayer(layers, mc, '0');
oJson['mc'] = mc;
oJson['animations'] = animations;


fs.writeFileSync('ae.js', 'export default ' + beautify(oJson, null, 2, 80), 'utf8');
