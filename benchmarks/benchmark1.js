var execSync = require('child_process').execSync;
// var cmd = 'node ../selenium/seleniumDeneme.js -f ../BenchmarkData/seleniumDeneme/selenium.csv';
var cmd = 'node ../selenium/seleniumDeneme.js -f ../BenchmarkData/localTests/local/selenium_site1.csv -u http://127.0.0.1:8085/length_adding_request_files/Length%20Adding%20Calculator.html';

const runCount = 10;

for (let i = 0; i < runCount; i++) {
  execSync(cmd, function (error, stdout, stderr) {
    if (error) console.log(error);
    console.log(stdout);
  });
}
