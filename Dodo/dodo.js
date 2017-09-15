var wd = require('selenium-webdriver'),
    By = wd.By,
    Key = wd.Key,
    until = wd.until;
var waitUntil = require('wait-until');
var assert = require('assert');
var SELENIUM_HOST = 'http://localhost:4444/wd/hub';
var URL = 'http://rabotavdodo.ru/';
var dodo = new wd.Builder()
    .usingServer(SELENIUM_HOST)
    .withCapabilities({
        browserName: 'chrome'
    })
    .build();


dodo.get(URL);
dodo.findElement(By.css('body > div.wrapper > div.main-screen > div.container > nav > div > button')).click()
  .then(function() {
    dodo.findElement(By.css('body > div > form > div > div:nth-child(3) > div > div.col-sm-5 > select > option:nth-child(134)')).click();
    dodo.findElement(By.id('name_01')).sendKeys('Тестович');
    dodo.findElement(By.id('name_02')).sendKeys('Тест');
    dodo.findElement(By.css('#birthday_day > option:nth-child(5)')).click();
    dodo.findElement(By.css('#birthday_month > option:nth-child(4)')).click();
    dodo.findElement(By.css('#birthday_year > option:nth-child(13)')).click();
    dodo.findElement(By.css('#partial > div:nth-child(3) > div > div.col-sm-5 > label:nth-child(4)')).click();
    dodo.findElement(By.id('phonenumber')).sendKeys(wd.Key.HOME, '9091244428');
    return dodo.wait(until.elementLocated(By.id('address')), 10 * 5000);
  })
    .then(function(address) {
      dodo.findElement(By.id('address')).sendKeys('167002, г. Сыктывкар, ул. Кутузова, 10');
      return dodo.wait(until.elementLocated(By.id('position_4')), 10 * 5000);
    })
      .then(function(position) {
        dodo.findElement(By.id('position_4')).click();
        dodo.findElement(By.id('worktime_02')).click();
        dodo.findElement(By.id('worktime_05')).click();
        dodo.findElement(By.id('med')).click();
        dodo.findElement(By.css('#applicantSource > option:nth-child(2)')).click();
        dodo.findElement(By.id('workExperience')).sendKeys('Я умею печь блинчики!');
        dodo.findElement(By.id('hobby')).sendKeys('Веду канал в инстаграме о том, как пеку блинчики!');
      })
        .then(function(ok) {
          console.log('Подача заявки: успешно');
          dodo.quit();
        });
