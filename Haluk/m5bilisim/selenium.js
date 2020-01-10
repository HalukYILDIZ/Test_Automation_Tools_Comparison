require("chromedriver"); // make driver reachable for nodeJS
require("geckodriver"); // make driver reachable for nodeJS

const { Builder, By, Key, until } = require("selenium-webdriver");
// const selenium = require('selenium-webdriver');

async function example2() {
  // const driver = await new Builder().forBrowser("chrome").build();
  const driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get(
      "http://www.m5bilisim.com/tr/hesaplamalar/permutasyon-hesaplama/"
    );

    await driver.wait(until.elementLocated(By.css("#eleman")), 10000);

    await driver.wait(until.elementLocated(By.css("#secim")), 10000);

    await driver.wait(
      until.elementLocated(
        By.css(
          "body > div.ortali-icerik > div.sol-icerik > div.sol-icerik-girinti > fieldset > form > div > div:nth-child(3) > input"
        )
      ),
      10000
    );

    function fillForm() {
      document.querySelector("#eleman").value = 8;
      document.querySelector("#secim").value = 2;
      document
        .querySelector(
          "body > div.ortali-icerik > div.sol-icerik > div.sol-icerik-girinti > fieldset > form > div > div:nth-child(3) > input"
        )
        .click();
      return 0;
    }

    await driver.executeScript(fillForm);

    await driver.wait(
      until.elementLocated(
        By.css(
          "body > div.ortali-icerik > div.sol-icerik > div.sol-icerik-girinti > div.hesap-tamam"
        )
      ),
      10000
    );

    function checkResults() {
      return document.querySelector(
        "body > div.ortali-icerik > div.sol-icerik > div.sol-icerik-girinti > div.hesap-tamam"
      ).innerText;
    }
    const result = await driver.executeScript(checkResults);

    if (result === "Hesaplama işlemi başarıyla tamamlandı.") {
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
