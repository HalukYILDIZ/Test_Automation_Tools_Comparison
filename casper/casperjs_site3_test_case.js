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
  document.querySelector('#prin').value = 50000;
  document.querySelector('#intr').value = 8.25;
  document.querySelector('#term').value = 30;
  document.querySelector('#strt').value = "12/02/2019";
  document.querySelector('#buttons > input.mlfield_submit').click();
}

const t0 = Date.now();

casper.start(url, function () {
  // Wait for the page to be loaded
  this.waitForSelector('#prin');
  this.waitForSelector('#intr');
  this.waitForSelector('#term');
  this.waitForSelector('#strt');
});

casper.then(function () {
  this.evaluate(fillForm);
});

casper.then(function () {
  this.waitForSelector('#calc_calc > table');
});


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

  const t1 = Date.now();
  const deltaT = t1 - t0;
  const print = "deltaT: " + deltaT;
  this.echo(print);
  writeToCSV(FilePath, deltaT);

});

casper.run(function () {
  casper.exit();
});