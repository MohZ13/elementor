'use strict';

var chalk = require('chalk');
var path = require('path');
var spawnHelper = require('./spawnHelper');

var buildCliCommand = function (configPath) {
  var cliPath = path.join(
    __dirname, '../node_modules/protractor/built/cli.js');

  return 'node ' + cliPath + ' ' +
    '--elementExplorer true ' +
    '--debuggerServerPort 9797 ' +
    configPath;
};

var startProtractor = function (options) {
  console.log('Creating protractor configuration file');
  console.log(chalk.blue('Starting protractor'));
  var cliCommand = buildCliCommand(options.configPath);
  return spawnHelper.runCommand(cliCommand, /Server listening on/g);
};

module.exports = {
  startProtractor: startProtractor
};
