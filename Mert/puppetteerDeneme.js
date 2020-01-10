const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://calculator.com/calculate/mortgage/');

  await page.waitFor('#prin');
  await page.waitFor('#intr');
  await page.waitFor('#term');
  await page.waitFor('#strt');

  function fillForm() {
    document.querySelector('#prin').value = 50000;
    document.querySelector('#intr').value = 8.25;
    document.querySelector('#term').value = 30;
    document.querySelector('#strt').value = 12/02/2019;
    document.querySelector('#buttons > input.mlfield_submit').click();
  }


  await page.evaluate(fillForm);

  await page.waitFor('#calc_calc > table');

  function checkResults() {
    return document.querySelector('#calc_calc > table > tbody > tr > td > font:nth-child(2) > ul > li:nth-child(4)').innerText;
  }

  const result = await page.evaluate(checkResults);

  if (result === "Total Payment: $ 135,227.99") {
    console.log("Passed!");
  } else {
    console.log("Failed!");
  }


  await browser.close();
})();