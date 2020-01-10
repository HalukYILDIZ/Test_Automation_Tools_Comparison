var casper = require("casper").create();
var fs = require('fs');


function writeToCSV(filePath, data) {
  fs.write(filePath, data.toString() + "\n", 'a');
}


function getCommandLineArguments() {
  // casperjs example.js -f example.csv -u https://calculator.com/calculate/feetinches/
  const commandParameter = casper.cli.args[0];
  const fileParameter = casper.cli.args[1];

  const commandParameter2 = casper.cli.args[2];
  const urlParameter = casper.cli.args[3];

  // casper.echo('commandParameter :', commandParameter);
  // casper.echo('fileParameter :', fileParameter);

  if (commandParameter === undefined) throw new Error("you need to pass first parameter '-f' ");
  if (commandParameter !== "-f") throw new Error("you need to pass first parameter '-f' ");
  if (commandParameter === "-f" && fileParameter === undefined) {
    throw new Error("you need to pass file name as a parameter after '-f' ");
  }
  if (commandParameter2 === undefined || commandParameter2 !== "-u") {
    throw new Error('you need to pass "-u" parameter for url.');
  }

  if (urlParameter === undefined) throw new Error('you need to pass url string after "-u" parameter!');

  casper.echo('fileParameter :' + fileParameter);
  casper.echo('urlParameter :' + urlParameter);
  return { file: fileParameter, url: urlParameter };
}

const parameters = getCommandLineArguments();
casper.echo(parameters.url);
const FilePath = parameters.file;
const url = parameters.url;

casper.echo('FilePath :' + FilePath);
casper.echo('URL :' + url.toString());


function fillForm() {
  document.querySelector('#A').value = 200;
  document.querySelector('#R').value = 1;
  document.querySelector('#P').value = 1;
  document.querySelector('#T').value = 12;
  document.querySelector('#Y').value = 12;
  document.querySelector('#X').value = 1;
  document.querySelector('#buttons > input.mlfield_submit').click();
}

const t0 = Date.now();

casper.start(url, function () {
  // Wait for the page to be loaded
  this.waitForSelector('#A');
  this.waitForSelector('#R');
  this.waitForSelector('#P');
  this.waitForSelector('#T');
  this.waitForSelector('#Y');
  this.waitForSelector('#X');
  this.waitForSelector('#buttons > input.mlfield_submit');
});

casper.then(function () {
  this.evaluate(fillForm);
});

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

  const t1 = Date.now();
  const deltaT = t1 - t0;
  const print = "deltaT: " + deltaT;
  this.echo(print);
  writeToCSV(FilePath, deltaT);

});

casper.run(function () {
  casper.exit();
});
