var casper = require('casper').create();
var fs = require('fs');

/* var casper = require('casper').create({
  verbose: true,
  logLevel: "debug"
}); */

/* var casper = require('casper').create({
  verbose: true,
  logLevel: 'error',
  pageSettings: {
    loadImages: false,
    loadPlugins: false,
    userAgent: 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.2 Safari/537.36'
  }
}); */

function getCommandLineArguments() {
  // node example.js -f example.csv -u https://calculator.com/calculate/feetinches/
  const commandParameter = process.argv[2];
  const fileParameter = process.argv[3];

  const commandParameter2 = process.argv[4];
  const urlParameter = process.argv[5];

  // console.log('commandParameter :', commandParameter);
  // console.log('fileParameter :', fileParameter);

  if (commandParameter === undefined) throw new Error("you need to pass first parameter '-f' ");
  if (commandParameter !== "-f") throw new Error("you need to pass first parameter '-f' ");
  if (commandParameter === "-f" && fileParameter === undefined) {
    throw new Error("you need to pass file name as a parameter after '-f' ");
  }
  if (commandParameter2 === undefined || commandParameter2 !== "-u") {
    throw new Error('you need to pass "-u" parameter for url.');
  }

  if (urlParameter === undefined) throw new Error('you need to pass url string after "-u" parameter!');

  console.log('fileParameter :', fileParameter);
  console.log('urlParameter :', urlParameter);
  return { file: fileParameter, url: urlParameter };
}

const { file: FilePath, url: URL } = getCommandLineArguments();
console.log('FilePath :', FilePath);
console.log('URL :', URL);

function writeToCSV(filePath, data) {
  fs.appendFile(filePath, data.toString() + '\n', function (err) {
    if (err) throw err;
    // console.log('Saved!');
  });
}


function fillForm() {
  document.querySelector('#untWidth').value = 200;
  document.querySelector('#subuntWidth').value = 200;
  document.querySelector('#untLength').value = 200;
  document.querySelector('#subuntLength').value = 200;
  document.querySelector('#buttons > input.mlfield_submit').click();
}

const t0 = Date.now();

function testCase() {




  casper.start(

    // 'https://calculator.com/calculate/feetinches/',
    'http://127.0.0.1:8085/length_adding_request_files/Length%20Adding%20Calculator.html',

    function () {
      // Wait for the page to be loaded
      this.waitForSelector('#untWidth');
      this.waitForSelector('#subuntWidth');
      this.waitForSelector('#untLength');
      this.waitForSelector('#subuntLength');
      this.waitForSelector('#buttons > input.mlfield_submit');
    }

  );





  casper.then(
    function () {
      this.evaluate(fillForm);
    }
  );

  casper.then(function () {
    this.waitForSelector('#calc_calc > center > table:nth-child(2)');
  });

  function checkResults() {
    return document.querySelector('#calc_calc > center > table:nth-child(2) > tbody > tr > td > center > table > tbody > tr > td > font').innerText;
  }

  casper.then(function () {
    this.echo("timeout: " + this.options.waitTimeout.toString());

    const result = this.evaluate(checkResults);

    if (result === "Total of 433 feet and 4 inches") {
      this.echo("Passed!");
      // casper.log("Passed!");
    } else {
      this.echo("Failed!");
      // casper.log("Failed");
    }

    const t1 = Date.now();
    const deltaT = t1 - t0;
    const print = "deltaT: " + deltaT;
    this.echo(print).exit();
    writeToCSV(deltaT);
    // casper.log(print);

  });

  casper.on('run.complete', function () {
    this.echo('Test completed');

    this.exit();
  });

  casper.run(function () {
    // require('utils').dump(JSON.parse(this.getPageContent()));
    // this.echo(this.debugHTML());
    // this.exit();
    casper.exit();

  });

}



