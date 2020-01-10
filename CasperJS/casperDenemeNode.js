// var casper = require('casper').create();

var casper = require('casper').create({
  verbose: true,
  logLevel: "debug"
});
const t0 = Date.now();

casper.start(

  'https://calculator.com/calculate/feetinches/',

  function () {
    // Wait for the page to be loaded
    this.waitForSelector('#untWidth');
    this.waitForSelector('#subuntWidth');
    this.waitForSelector('#untLength');
    this.waitForSelector('#subuntLength');
    this.waitForSelector('#buttons > input.mlfield_submit');
  }

);


function fillForm() {
  document.querySelector('#untWidth').value = 200;
  document.querySelector('#subuntWidth').value = 200;
  document.querySelector('#untLength').value = 200;
  document.querySelector('#subuntLength').value = 200;
  document.querySelector('#buttons > input.mlfield_submit').click();
}


casper.then(
  function () {
    this.evaluate(fillForm);
  }
)

casper.then(function () {
  this.waitForSelector('#calc_calc > center > table:nth-child(2)');
});

function checkResults() {
  return document.querySelector('#calc_calc > center > table:nth-child(2) > tbody > tr > td > center > table > tbody > tr > td > font').innerText;
}

casper.then(function () {

  const result = this.evaluate(checkResults);

  if (result === "Total of 433 feet and 4 inches") {
    // this.echo("Passed!");
    casper.log("Passed!");
  } else {
    // this.echo("Failed!");
    casper.log("Failed");
  }

  const t1 = Date.now();
  const deltaT = t1 - t0;
  const print = "deltaT: " + deltaT;
  // this.echo(print);
  casper.log(print);

});


casper.run(function () {
  // require('utils').dump(JSON.parse(this.getPageContent()));
  // this.echo(this.debugHTML());
  this.exit();
}); 