'use strict';

var explorerClient = require('./elementExplorerClient');
var locatorFinder = require('./locatorFinder');

var encode = function (results) {
    return { results: results };
};

var handlePopupRequest = function (input, res) {
    // If the popup input starts with 'by' then execute a count expression.
    if (/^by/.test(input)) {
        input = 'element.all(' + input + ').count()';
    }

    console.log('Popup input [%s]', input);

    explorerClient.runCommand(input).then(function (response) {
        var results = {};
        results[input] = response;

        res.send(encode(results));
    });
};

var handleDevTools = function (devtoolsInput, res) {
    var locatorResults = {},
        locators = JSON.parse(devtoolsInput),
        suggestionList = locatorFinder.buildLocatorList(locators);

    console.log('Testing suggestions', suggestionList);

    function testNext(index) {
        // Is it done testing locators?
        if (index === suggestionList.length) {
            console.log('Done testing suggestions, returning', locatorResults);
            return res.send(encode(locatorResults));
        }

        var suggestion = suggestionList[index],
            input = suggestion.countExpression;
        explorerClient.runCommand(input).then(function (response) {
            locatorResults[suggestion.locator] = response;
            testNext(index + 1);
        });
    }
    testNext(0);
};

module.exports = {
    encode: encode,
    handleDevTools: handleDevTools,
    handlePopupRequest: handlePopupRequest
}
