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


function getPrimes() {
  function searchForPrime(end) {
    var primes = [];
    for (var i = 2; i <= end; i++) {
      primes.push(i);

      for (var j = 2; j <= Math.floor(i / 2); j++) {
        if ((i / j) === Math.floor(i / j)) {
          primes.pop();
          break;
        }
      }

    }
    return primes;
  }

  return searchForPrime(100000);
}

const t0 = Date.now();

casper.start(url, function () {
  // Wait for the page to be loaded
  this.waitForSelector('body');

});


casper.then(function () {
  const result = this.evaluate(getPrimes);

  // console.log(result);

  const t1 = Date.now();
  const deltaT = t1 - t0;
  const print = "deltaT: " + deltaT;
  this.echo(print);
  writeToCSV(FilePath, deltaT);

});

casper.run(function () {
  casper.exit();
});
