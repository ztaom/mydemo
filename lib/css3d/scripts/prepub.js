#!/usr/bin/env node

'use strict';

const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
// const CWD = path.resolve(__dirname);
const LIBPATH = path.join(__dirname, '../lib');
const SRCPATH = path.join(__dirname, '../src');

// clean lib directory
if (fs.existsSync(LIBPATH)) {
   fse.removeSync(LIBPATH);
}

// copy src to lib
fse.copySync(SRCPATH, LIBPATH, {filter: (filepath) => ! /\.jsx?$/.test(filepath)})

console.log('prepub done');
