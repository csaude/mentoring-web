exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['tutor/create-tutored.js'],
  
  // maximize the browser
  onPrepare: function() {
    browser.driver.manage().window().maximize();
  }

};