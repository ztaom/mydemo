var fs = require('fs');
var path = require('path');
var version = require(path.join(__dirname, '../', 'package.json')).version;
var themeconfPath = path.join(__dirname, 'themes', 'vue', '_config.yml');
var themeconfig = fs.readFileSync(themeconfPath, 'utf-8');

fs.writeFileSync(
  themeconfPath,
  themeconfig.replace(/aft_version: .*/, 'aft_version: ' + version)
);