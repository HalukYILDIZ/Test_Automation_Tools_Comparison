require("chromedriver"); // make driver reachable for nodeJS
require("geckodriver"); // make driver reachable for nodeJS

const { Builder, By, Key, until } = require("selenium-webdriver");
// const selenium = require('selenium-webdriver');


async function example2() {
  // const driver = await new Builder().forBrowser("chrome").build();
  const driver = await new Builder().forBrowser("chrome").build();

  

  try {
    await driver.get("https://calculator.com/calculate/mortgage/");

      await driver.wait(
      until.elementLocated(By.css("#prin")),
      10000
    );

      await driver.wait(
      until.elementLocated(By.css("#intr")),
      10000
    );

      await driver.wait(
      until.elementLocated(By.css("#term")),
      10000
    );

      await driver.wait(
      until.elementLocated(By.css("#strt")),
      10000
    );
  

    function fillForm() {
      document.querySelector("#prin").value = 50000;
      document.querySelector("#intr").value = 8.25;
      document.querySelector("#term").value = 30;
      document.querySelector("#strt").value = "12/02/2019";
      document.querySelector("#buttons > input.mlfield_submit").click();
      return 0;
    }

    await driver.executeScript(fillForm);

    await driver.wait(
      until.elementLocated(By.css("#calc_calc > table")),
      10000
    );

    function checkResults() {
      return document.querySelector('#calc_calc > table > tbody > tr > td > font:nth-child(2) > ul > li:nth-child(4)').innerText;
    }
    const result = await driver.executeScript(checkResults);

  

    if (result === "Total Payment: $ 135,227.99") {
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
