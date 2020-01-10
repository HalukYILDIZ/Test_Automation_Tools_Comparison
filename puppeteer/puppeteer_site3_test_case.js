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

  await page.waitFor('#prin');
  await page.waitFor('#intr');
  await page.waitFor('#term');
  await page.waitFor('#strt');

  function fillForm() {
    document.querySelector('#prin').value = 50000;
    document.querySelector('#intr').value = 8.25;
    document.querySelector('#term').value = 30;
    document.querySelector('#strt').value = 12 / 02 / 2019;
    document.querySelector('#buttons > input.mlfield_submit').click();
  }


  await page.evaluate(fillForm);

  await page.waitFor('#calc_calc > table');

  function checkResults() {
    return document.querySelector('#calc_calc > table > tbody > tr > td > font:nth-child(2) > ul > li:nth-child(4)').innerText;
  }

  const result = await page.evaluate(checkResults);

  if (result === "Total Payment: $ 135,227.99") {
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