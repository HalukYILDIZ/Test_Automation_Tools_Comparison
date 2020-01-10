var casper = require('casper').create();

/* var casper = require('casper').create({
  verbose: true,
  logLevel: "debug"
}); */

casper.start('https://calculator.com/calculate/mortgage/', function () {
  // Wait for the page to be loaded
  this.waitForSelector('#prin');
  this.waitForSelector('#intr');
  this.waitForSelector('#term');
  this.waitForSelector('#strt');
});

function fillForm() {
  document.querySelector('#prin').value = 50000;
  document.querySelector('#intr').value = 8.25;
  document.querySelector('#term').value = 30;
  document.querySelector('#strt').value = "12/02/2019";
  document.querySelector('#buttons > input.mlfield_submit').click();
}

casper.then(function () {
  this.evaluate(fillForm);
})

casper.then(function () {
  this.waitForSelector('#calc_calc > table');
})

function checkResults() {
  return document.querySelector('#calc_calc > table > tbody > tr > td > font:nth-child(2) > ul > li:nth-child(4)').innerText;
}

casper.then(function () {
  const result = this.evaluate(checkResults);
  if (result === "Total Payment: $ 135,227.99") {
    this.echo("Passed!");
  } else {
    this.echo("Failed!");
  }
})


casper.run(function () {
  // require('utils').dump(JSON.parse(this.getPageContent()));
  // this.echo(this.debugHTML());
  this.exit();
});