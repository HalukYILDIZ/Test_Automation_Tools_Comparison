
var spawn = require('child_process').spawn;
var spawnSync = require('child_process').spawnSync;



const runCount = 2;

for (let i = 0; i < runCount; i++) {
  let child2 = spawnSync("casperjs", ["../CasperJS/casperDeneme.js"]);

  console.log("cycle no: " + i + "---------------------------------------");
  /*   console.log(child2);
    console.log("buffer---");
    console.log(child2.output[0]);
    console.log(child2.output[1].toString());
    console.log(child2.output[2].toString());
    console.log("buffer---"); */
  if (child2.error) console.log('error', child2.error.toString());
  if (child2.stdout) console.log('stdout ', child2.stdout.toString());
  if (child2.stderr) console.log('stderr ', child2.stderr.toString());

}


