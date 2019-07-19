#!/usr/bin/env node

var minimist = require('minimist');
var path = require('path');

var args = minimist(process.argv.slice(2), {
  string: ['configPath', 'url'],
  alias: {h: 'help', v: 'version'}
});

if (args.help) {
  var cmd = path.basename(process.argv[1]);
  console.log('For extension use: --load-extension=', path.join(__dirname, '../extension'));
  console.log(require('fs')
      .readFileSync(path.join(__dirname, '../help.txt'), 'utf-8')
      .replace(/\$0/g, cmd)
      .trim());
  process.exit();
}

if (args.version) {
  console.log(require('../package.json').version);
  process.exit();
}

var getOptions = function() {
  // Test for flags
  var options = {};

  // Path to protractor.conf.js
  if (args.configPath) {
    options.configPath = args.configPath;
  }

  // URL to open on startup
  if (args.url) {
    options.url = args.url;
  }

  // Ignore synchronization?
  if (args.nonAngular) {
    options.ignoreSynchronization = true;
  }

  return options;
};


// Start elementor.
var options = getOptions();
require('../lib/server').start(options);
