const puppeteer = require('puppeteer');
const t0=Date.now();
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://calculator.com/calculate/loan/');

  await page.waitFor('#A');
  await page.waitFor('#R');
  await page.waitFor('#P');
  await page.waitFor('#T');
  await page.waitFor('#Y');
  await page.waitFor('#X');
  await page.waitFor('#buttons > input.mlfield_submit');

  function fillForm() {
    document.querySelector('#A').value = 200;
    document.querySelector('#R').value = 1;
    document.querySelector('#P').value = 1;
    document.querySelector('#T').value = 12;
    document.querySelector('#Y').value = 12;
    document.querySelector('#X').value = 1;
    document.querySelector('#buttons > input.mlfield_submit').click();
  }


  await page.evaluate(fillForm);

  await page.waitFor('#calc_calc > center > table > tbody > tr > td > center > h3:nth-child(1)');

  function checkResults() {
    return document.querySelector('#calc_calc > center > table > tbody > tr > td > center > h3:nth-child(1)').innerText;
  }

  const result = await page.evaluate(checkResults);

  if (result === "Your interest rate per period is 0.0833 % for 12 total periods ( 1 years)") {
    console.log("Passed!");
  } else {
    console.log("Failed!");
  }
  const t1=Date.now();
  const DeltaT=t1-t0;
  console.log(DeltaT);

  await browser.close();
})();