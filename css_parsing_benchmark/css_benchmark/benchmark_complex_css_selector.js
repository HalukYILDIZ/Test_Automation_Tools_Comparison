var execSync = require('child_process').execSync;
var spawnSync = require('child_process').spawnSync;
const createSchedule = require('./utils/schedule').createSchedule;


function runSelenium() {
  // var cmd = 'node ../../selenium/selenium_site2_test_case.js -f ../local/selenium_site2.csv -u http://127.0.0.1:8085/length_adding_request_files/Length%20Adding%20Calculator.html';
  var cmd = 'node ./selenium/selenium_css_benchmark.js -f selenium_complex_css_selector_benchmark.csv -u http://127.0.0.1:8085/css_benchmark_pages/complex_css_selector.html';

  let result = execSync(cmd);

  console.log(result.toString());
}

function runPuppeteer() {
  var cmd = "node ./puppeteer/puppeteer_css_benchmark.js -f puppeteer_complex_css_selector_benchmark.csv -u http://127.0.0.1:8085/css_benchmark_pages/complex_css_selector.html";

  let result = execSync(cmd);

  console.log(result.toString());
}

function runCasper() {
  // var cmd = "../../../casper/casperjs_site2_test_case.js -f casper_site2.csv -u http://127.0.0.1:8085/length_adding_request_files/Length%20Adding%20Calculator.html";
  var cmd = "./casper/casperjs_css_benchmark.js -f casperjs_complex_benchmark.csv -u http://127.0.0.1:8085/css_benchmark_pages/complex_css_selector.html";




  let child = spawnSync("casperjs", [cmd]);

  if (child.error) console.log('error', child.error.toString());
  if (child.stdout) console.log('stdout ', child.stdout.toString());
  if (child.stderr) console.log('stderr ', child.stderr.toString());


}



function tests() {
  runSelenium();
  runPuppeteer();
  runCasper();
}
// tests();

function benchmark() {
  const testCaseFunctions = [runSelenium, runPuppeteer, runCasper];
  const runCount = 50;
  const toolCount = 3;
  const schedule = createSchedule(toolCount, runCount);

  for (let i = 0; i < runCount; i++) {
    for (let j = 0; j < toolCount; j++) {
      testCaseFunctions[schedule[i][j]]();
    }
  }
}

benchmark();

