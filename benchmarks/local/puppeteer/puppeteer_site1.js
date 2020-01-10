var execSync = require('child_process').execSync;
// var cmd = 'node ../selenium/seleniumDeneme.js -f ../BenchmarkData/seleniumDeneme/selenium.csv';
// var cmd = 'node ../../selenium/seleniumDeneme.js -f ../local/selenium_site2.csv -u http://127.0.0.1:8085/length_adding_request_files/Length%20Adding%20Calculator.html';
// var cmd = 'node ../../selenium/selenium_site1_test_case.js -f ../local/selenium_site1.csv -u http://127.0.0.1:8085/loan_calculater_request_files/General%20Loan%20Calculator.html';
var cmd = 'node ../../../puppeteer/puppeteer_site1_test_case.js -f ../puppeteer/puppeteer_site1.csv -u http://127.0.0.1:8085/loan_calculater_request_files/General%20Loan%20Calculator.html';


const runCount = 30;

for (let i = 0; i < runCount; i++) {
  let result = execSync(cmd, function (error, stdout, stderr) {
    if (error) console.log("Hata mesajı:" + error.toString());
    console.log(stdout);
  });

  console.log(result.toString());
}
