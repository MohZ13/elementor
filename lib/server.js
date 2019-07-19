'use strict';

var bodyParser = require('body-parser');
var chalk = require('chalk');
var cliHelper = require('./cliHelper');
var explorerClient = require('./elementExplorerClient');
var handler = require('./handler');
var customLocators = require('./customLocators');
var express = require('express');

var startExpress = function () {
  var app = express();
  app.use(bodyParser.json());

  app.get('/testSelector', function (req, res) {
    var query = req.query;

    if (query.popupInput) {
      return handler.handlePopupRequest(query.popupInput, res);
    }

    if (query.locators) {
      return handler.handleDevTools(query.locators, res);
    }

    res.send(handler.encode({ error: 'Invalid input' }));
  });

  var server = app.listen(13000, function () {
    console.log(chalk.blue('Elementor is listening on http://localhost:%s'),
      server.address().port);
  });
};

var initExplorerSession = function (options) {
    var commands = '';

    if (options.ignoreSynchronization) {
      console.log(chalk.blue('Running elementor in non-angular mode.'));
      commands += 'browser.ignoreSynchronization = true;';
    }

    if (options.url) {
      console.log(chalk.blue('Getting page at:', options.url));
      commands += "browser.get('" + options.url + "');";
    }

    return explorerClient.runCommand(commands)
      .then(customLocators.addCustomLocators)
      .then(function () {
        console.log(chalk.green('Elementor is ready!'));
      });
}

/**
 * Start protractor process, then start the elementor server.
 */
var start = function (options) {
  cliHelper.startProtractor(options).then(function () {
    console.log(chalk.green('Done starting protractor'));
    console.log(chalk.blue('Starting elementor'));
    return startExpress();
  }).then(function () {
    console.log(chalk.blue('Initializing session...'))
    setTimeout(function () {
      initExplorerSession(options).then(function () {
        console.log(chalk.blue('Initialized session...'))
      });
    }, 3000);
  });
};

module.exports = {
  start: start
};
