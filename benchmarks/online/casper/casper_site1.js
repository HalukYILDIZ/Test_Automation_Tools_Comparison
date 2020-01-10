// var execSync = require('child_process').execSync;
var spawnSync = require('child_process').spawnSync;

var cmd = "../../../casper/casperjs_site1_test_case.js -f casper_site1.csv -u https://calculator.com/calculate/loan/";

const runCount = 30;

for (let i = 0; i < runCount; i++) {
  let child2 = spawnSync("casperjs", [cmd]);

  console.log("cycle no: " + i + "---------------------------------------");
  if (child2.error) console.log('error', child2.error.toString());
  if (child2.stdout) console.log('stdout ', child2.stdout.toString());
  if (child2.stderr) console.log('stderr ', child2.stderr.toString());

}