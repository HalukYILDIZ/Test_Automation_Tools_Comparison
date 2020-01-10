// var execSync = require('child_process').execSync;
var spawnSync = require('child_process').spawnSync;

var cmd = "../../../casper/casperjs_site2_test_case.js -f casper_site2.csv -u http://127.0.0.1:8085/length_adding_request_files/Length%20Adding%20Calculator.html";

const runCount = 30;

for (let i = 0; i < runCount; i++) {
  let child2 = spawnSync("casperjs", [cmd]);

  console.log("cycle no: " + i + "---------------------------------------");
  if (child2.error) console.log('error', child2.error.toString());
  if (child2.stdout) console.log('stdout ', child2.stdout.toString());
  if (child2.stderr) console.log('stderr ', child2.stderr.toString());

}