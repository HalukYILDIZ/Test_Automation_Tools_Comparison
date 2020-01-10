require("chromedriver"); // make driver reachable for nodeJS
require("geckodriver"); // make driver reachable for nodeJS
const chrome = require('selenium-webdriver/chrome');

// const searchForPrime = require('../utils/primeNumberGenerator');
// const searchForPrime = require('../utils/primeNumberGenerator');





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

const screen = {
  width: 640,
  height: 480
};
const { file: FilePath, url: URL } = getCommandLineArguments();
console.log('FilePath :', FilePath);
console.log('URL :', URL);

function writeToCSV(filePath, dataRows) {
  const csv = require('fast-csv');
  const fs = require('fs');

  const ws = fs.createWriteStream(filePath, { flags: 'a' });
  csv.writeToStream(ws, dataRows);
  ws.write("\n", error => console.log(error));
}

function getBackgroundColor(){
  const body = document.getElementsByTagName('body')[0];
  return getComputedStyle(body).backgroundColor;
}

const { Builder, By, Key, until } = require("selenium-webdriver");

async function example2() {
  const driver = await new Builder().forBrowser("chrome")
  .setChromeOptions(new chrome.Options().headless().windowSize(screen))
  .build();


  try {
    await driver.get(URL);

    await driver.wait(
      until.elementLocated(By.css("body")),
      10000
    );

    const result = await driver.executeScript(getBackgroundColor);
    console.log(result);

    

    driver.close();
  } catch (error) {
    console.error(error);
  }
}

async function benchmark() {
  const t0 = Date.now();

  await example2();

  const t1 = Date.now();
  const delta_t = t1 - t0;

  console.log(`delta_t: ${delta_t} millisecond`);

  writeToCSV(FilePath, [[delta_t]]);
  return delta_t;
}

benchmark();
