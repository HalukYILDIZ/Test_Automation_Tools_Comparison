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
  await page.goto(URL);

  await page.waitFor('#A');
  await page.waitFor('#R');
  await page.waitFor('#P');
  await page.waitFor('#T');
  await page.waitFor('#Y');
  await page.waitFor('#X');
  await page.waitFor('#buttons > input.mlfield_submit');

  function fillForm() {
    document.querySelector('#A').value = 200;
    document.querySelector('#R').value = 1;
    document.querySelector('#P').value = 1;
    document.querySelector('#T').value = 12;
    document.querySelector('#Y').value = 12;
    document.querySelector('#X').value = 1;
    document.querySelector('#buttons > input.mlfield_submit').click();
  }


  await page.evaluate(fillForm);

  await page.waitFor('#calc_calc > center > table > tbody > tr > td > center > h3:nth-child(1)');

  function checkResults() {
    return document.querySelector('#calc_calc > center > table > tbody > tr > td > center > h3:nth-child(1)').innerText;
  }

  const result = await page.evaluate(checkResults);

  if (result === "Your interest rate per period is 0.0833 % for 12 total periods ( 1 years)") {
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