var casper = require("casper").create();

/* var casper = require('casper').create({
  verbose: true,
  logLevel: "debug"
}); */
const t0 = Date.now();
casper.start(
  "http://www.m5bilisim.com/tr/hesaplamalar/permutasyon-hesaplama/",
  function() {
    // Wait for the page to be loaded

    this.waitForSelector("#eleman");
    this.waitForSelector("#secim");

    this.waitForSelector(
      "body > div.ortali-icerik > div.sol-icerik > div.sol-icerik-girinti > fieldset > form > div > div:nth-child(3) > input"
    );
  }
);

function fillForm() {
  document.querySelector("#eleman").value = 8;
  document.querySelector("#secim").value = 2;

  document
    .querySelector(
      "body > div.ortali-icerik > div.sol-icerik > div.sol-icerik-girinti > fieldset > form > div > div:nth-child(3) > input"
    )
    .click();
}

casper.then(function() {
  this.evaluate(fillForm);
});

casper.then(function() {
  this.waitForSelector(
    "body > div.ortali-icerik > div.sol-icerik > div.sol-icerik-girinti > div.hesap-tamam"
  );
});

function checkResults() {
  return document.querySelector(
    "body > div.ortali-icerik > div.sol-icerik > div.sol-icerik-girinti > div.hesap-tamam"
  ).innerText;
}

casper.then(function() {
  const result = this.evaluate(checkResults);
  if (result === "Hesaplama işlemi başarıyla tamamlandı.") {
    this.echo("Passed!");
  } else {
    this.echo("Failed!");
  }
  const t1 = Date.now();
  const DeltaT = t1 - t0;
  console.log(DeltaT);
});

casper.run(function() {
  // require('utils').dump(JSON.parse(this.getPageContent()));
  // this.echo(this.debugHTML());
  this.exit();
});
