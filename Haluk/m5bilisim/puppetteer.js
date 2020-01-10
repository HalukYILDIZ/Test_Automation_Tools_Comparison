const puppeteer = require("puppeteer");
const t0 = Date.now();
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    "http://www.m5bilisim.com/tr/hesaplamalar/permutasyon-hesaplama/"
  );

  await page.waitFor("#eleman");
  await page.waitFor("#secim");

  await page.waitFor(
    "body > div.ortali-icerik > div.sol-icerik > div.sol-icerik-girinti > fieldset > form > div > div:nth-child(3) > input"
  );

  function fillForm() {
    document.querySelector("#eleman").value = 8;
    document.querySelector("#secim").value = 1;

    document
      .querySelector(
        "body > div.ortali-icerik > div.sol-icerik > div.sol-icerik-girinti > fieldset > form > div > div:nth-child(3) > input"
      )
      .click();
  }

  await page.evaluate(fillForm);

  await page.waitFor(
    "body > div.ortali-icerik > div.sol-icerik > div.sol-icerik-girinti > div.hesap-tamam"
  );

  function checkResults() {
    return document.querySelector(
      "body > div.ortali-icerik > div.sol-icerik > div.sol-icerik-girinti > div.hesap-tamam"
    ).innerText;
  }

  const result = await page.evaluate(checkResults);

  if (result === "Hesaplama işlemi başarıyla tamamlandı.") {
    console.log("Passed!");
  } else {
    console.log("Failed!");
  }
  const t1 = Date.now();
  const DeltaT = t1 - t0;
  console.log(DeltaT);

  await browser.close();
})();
