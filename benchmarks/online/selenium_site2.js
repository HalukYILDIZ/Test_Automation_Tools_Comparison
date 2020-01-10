var execSync = require('child_process').execSync;
// var cmd = 'node ../selenium/seleniumDeneme.js -f ../BenchmarkData/seleniumDeneme/selenium.csv';
// var cmd = 'node ../../selenium/seleniumDeneme.js -f ../local/selenium_site2.csv -u http://127.0.0.1:8085/length_adding_request_files/Length%20Adding%20Calculator.html';
var cmd = 'node ../../selenium/selenium_site2_test_case.js -f ../online/selenium_site2.csv -u https://calculator.com/calculate/feetinches/';

const runCount = 30;

for (let i = 0; i < runCount; i++) {
  let result = execSync(cmd, function (error, stdout, stderr) {
    if (error) console.log("Hata mesajı:" + error.toString());
    console.log(stdout);
  });

  console.log(result.toString());
}