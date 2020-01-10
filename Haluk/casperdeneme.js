var casper = require('casper').create();

/* var casper = require('casper').create({
  verbose: true,
  logLevel: "debug"
}); */
const t0=Date.now();
casper.start('https://calculator.com/calculate/loan/', function () {
  // Wait for the page to be loaded
  
  this.waitForSelector('#A');
  this.waitForSelector('#R');
  this.waitForSelector('#P');
  this.waitForSelector('#T');
  this.waitForSelector('#Y');
  this.waitForSelector('#X');
  this.waitForSelector('#buttons > input.mlfield_submit');
});

function fillForm() {
  document.querySelector('#A').value = 200;
  document.querySelector('#R').value = 1;
  document.querySelector('#P').value = 1;
  document.querySelector('#T').value = 12;
  document.querySelector('#Y').value = 12;
  document.querySelector('#X').value = 1;
  document.querySelector('#buttons > input.mlfield_submit').click();
}

casper.then(function () {
  this.evaluate(fillForm);
})

casper.then(function () {
  this.waitForSelector('#calc_calc > center > table > tbody > tr > td > center > h3:nth-child(1)');
})

function checkResults() {
  return document.querySelector('#calc_calc > center > table > tbody > tr > td > center > h3:nth-child(1)').innerText;
}

casper.then(function () {
  const result = this.evaluate(checkResults);
  if (result === "Your interest rate per period is 0.0833 % for 12 total periods ( 1 years)") {
    this.echo("Passed!");
  } else {
    this.echo("Failed!");
  }
  const t1=Date.now();
  const DeltaT=t1-t0;
  console.log(DeltaT);
})


casper.run(function () {
  // require('utils').dump(JSON.parse(this.getPageContent()));
  // this.echo(this.debugHTML());
  this.exit();
});