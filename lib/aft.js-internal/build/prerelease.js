#!/usr/bin/env node

var path = require('path');
var fs = require('fs');
var root = path.resolve(__dirname, '..');
var pkg = require(path.join(root, 'package.json'));

delete pkg.scripts;
delete pkg.devDependencies;
pkg.main = 'lite.js';

fs.writeFileSync(path.join(root, 'dist', 'package.json'), JSON.stringify(pkg, null, '  '), 'utf-8');

var files = ['README.md', 'LICENSE', 'NOTICE'];
files.forEach(function(file) {
    var str = fs.readFileSync(path.join(root, file), 'utf-8');
    fs.writeFileSync(path.join(root, 'dist', file), str, 'utf-8');
});