const puppeteer = require('puppeteer');

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

function writeToCSV(filePath, dataRows) {
  const csv = require('fast-csv');
  const fs = require('fs');

  const ws = fs.createWriteStream(filePath, { flags: 'a' });
  csv.writeToStream(ws, dataRows);
  ws.write("\n", error => console.log(error));
}

async function testCase() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // await page.goto('https://calculator.com/calculate/feetinches/');
  await page.goto(URL);

  await page.waitFor('#untWidth');
  await page.waitFor('#subuntWidth');
  await page.waitFor('#untLength');
  await page.waitFor('#subuntLength');
  await page.waitFor('#buttons > input.mlfield_submit');

  function fillForm() {
    document.querySelector('#untWidth').value = 200;
    document.querySelector('#subuntWidth').value = 200;
    document.querySelector('#untLength').value = 200;
    document.querySelector('#subuntLength').value = 200;
    document.querySelector('#buttons > input.mlfield_submit').click();
  }


  await page.evaluate(fillForm);

  await page.waitFor('#calc_calc > center > table:nth-child(2)');

  function checkResults() {
    return document.querySelector('#calc_calc > center > table:nth-child(2) > tbody > tr > td > center > table > tbody > tr > td > font').innerText;
  }

  const result = await page.evaluate(checkResults);

  if (result === "Total of 433 feet and 4 inches") {
    console.log("Passed!");
  } else {
    console.log("Failed!");
  }


  await browser.close();
}

async function benchmark() {
  const t0 = Date.now();

  // example();
  await testCase();

  const t1 = Date.now();
  const delta_t = t1 - t0;

  console.log(`delta_t: ${delta_t} millisecond`);

  writeToCSV(FilePath, [[delta_t]]);
  return delta_t;
}

benchmark();