'use strict';

var explorerClient = require('./elementExplorerClient');

var dataTest = 'protractor.By.addLocator("dataTest",function(t,r,a){let e="";return Array.isArray(t)?(t.forEach(t=>{e+=`[data-test="${t}"]`}),e=e.trim()):e=`[data-test="${t}"]`,(r||document).querySelectorAll(e)});';

var dataTestContainingText = 'protractor.By.addLocator("dataTestContainingText",function(t,e,n,o,r){const a=(o||document).querySelectorAll(`[data-test="${t}"]`);return Array.prototype.filter.call(a,function(t){return n?t.textContent===e:t.textContent.includes(e)})});'

var addCustomLocators = function () {
    return explorerClient.runCommand(dataTest).then(function () {
        return explorerClient.runCommand(dataTestContainingText);
    });
}

module.exports = {
    addCustomLocators: addCustomLocators
}
