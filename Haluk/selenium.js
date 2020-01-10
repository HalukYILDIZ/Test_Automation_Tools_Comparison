require("chromedriver"); // make driver reachable for nodeJS
require("geckodriver"); // make driver reachable for nodeJS

const { Builder, By, Key, until } = require("selenium-webdriver");
// const selenium = require('selenium-webdriver');


async function example2() {
  // const driver = await new Builder().forBrowser("chrome").build();
  const driver = await new Builder().forBrowser("chrome").build();

  

  try {
    await driver.get("https://calculator.com/calculate/loan/");

      await driver.wait(
      until.elementLocated(By.css("#A")),
      10000
    );

      await driver.wait(
      until.elementLocated(By.css("#R")),
      10000
    );

      await driver.wait(
      until.elementLocated(By.css("#P")),
      10000
    );

      await driver.wait(
      until.elementLocated(By.css("#T")),
      10000
    );

    await driver.wait(
      until.elementLocated(By.css("#Y")),
      10000
    );
  

      await driver.wait(
      until.elementLocated(By.css("#X")),
      10000
    );

      await driver.wait(
      until.elementLocated(By.css("#buttons > input.mlfield_submit")),
      10000
    );

      


    function fillForm() {
      document.querySelector("#A").value = 200;
      document.querySelector("#R").value = 1;
      document.querySelector("#P").value = 1;
      document.querySelector("#T").value = 12;
      document.querySelector("#Y").value = 12;
      document.querySelector("#X").value = 1;
      document.querySelector("#buttons > input.mlfield_submit").click();
      return 0;
    }

    await driver.executeScript(fillForm);

    await driver.wait(
      until.elementLocated(By.css("#calc_calc > center > table > tbody > tr > td > center > h3:nth-child(1)")),
      10000
    );

    function checkResults() {
      return document.querySelector('#calc_calc > center > table > tbody > tr > td > center > h3:nth-child(1)').innerText;
    }
    const result = await driver.executeScript(checkResults);


    if (result === "Your interest rate per period is 0.0833 % for 12 total periods ( 1 years)") {
      console.log("Passed!");
    } else {
      console.log("Failed!");
    }
    


    driver.close();
  } catch (error) {
    console.error(error);
  }
}



async function benchmark() {
  const t0 = Date.now();

  // example();
  await example2();

  const t1 = Date.now();

  console.log(`delta_t: ${t1 - t0} millisecond`);
}

benchmark();
