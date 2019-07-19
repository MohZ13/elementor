var path = require('path');

exports.config = {
  chromeDriver: './drivers/chromedriver',
  seleniumServerJar: './jars/selenium-server-standalone-3.6.0.jar',
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: ['disable-infobars=true', '--load-extension=' + path.resolve(__dirname, '../extension')]
    }
  }
};
