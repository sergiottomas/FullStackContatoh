exports.config = {
  specs: ['../test/e2e/**/*.js'],
  onPrepare: function(){
    browser.driver.manage().window().setSize(1280, 1024);
    browser.driver.get('http://localhost:3000/');
    browser.driver.findElement(by.id('entrar')).click(); //action



    //in github
    browser.driver.findElement(by.id('login_field')).sendKeys('sergio.souza@tugare.com.br');
    browser.driver.findElement(by.id('password')).sendKeys('myname1928');
    browser.driver.findElement(by.name('commit')).click(); //action
  }
};
