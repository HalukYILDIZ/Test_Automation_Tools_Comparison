var execSync = require('child_process').execSync;

var cmd = 'node ../../../puppeteer/puppeteer_site2_test_case.js -f ../puppeteer/puppeteer_site2.csv -u https://lumosmind.github.io/length/index.html';


const runCount = 30;

for (let i = 0; i < runCount; i++) {
  let result = execSync(cmd, function (error, stdout, stderr) {
    if (error) console.log("Hata mesajı:" + error.toString());
    console.log(stdout);
  });

  console.log(result.toString());
}
