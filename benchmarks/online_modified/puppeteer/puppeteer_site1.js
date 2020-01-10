var execSync = require('child_process').execSync;

var cmd = 'node ../../../puppeteer/puppeteer_site1_test_case.js -f ../puppeteer/puppeteer_site1.csv -u https://lumosmind.github.io/loan/index.html';


const runCount = 30;

for (let i = 0; i < runCount; i++) {
  let result = execSync(cmd, function (error, stdout, stderr) {
    if (error) console.log("Hata mesajı:" + error.toString());
    console.log(stdout);
  });

  console.log(result.toString());
}
