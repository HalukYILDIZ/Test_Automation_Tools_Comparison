var execSync = require('child_process').execSync;

var cmd = 'node ../../selenium/selenium_site3_test_case.js -f ./selenium_site3.csv -u https://lumosmind.github.io/mortgage/index.html';

const runCount = 30;

for (let i = 0; i < runCount; i++) {
  let result = execSync(cmd, function (error, stdout, stderr) {
    if (error) console.log("Hata mesajı:" + error.toString());
    console.log(stdout);
  });

  console.log(result.toString());
}