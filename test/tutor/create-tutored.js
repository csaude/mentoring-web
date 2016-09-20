describe('A page for creating Tutoreds', function() {
  it('should create a tutored', function() {
    browser.get('http://localhost:3000/app');

    element(by.id('tutorsAndTutoreds')).click().then(function(){
      element(by.id('createTutored')).click();
    });

    element(by.model('tutored.name')).sendKeys('Stelio');
    element(by.model('tutored.surname')).sendKeys('Moiane');
    element(by.model('tutored.phoneNumber')).sendKeys('+258822546100');

    element(by.id('saveTutored')).click();

    // check the expectations

  });
});