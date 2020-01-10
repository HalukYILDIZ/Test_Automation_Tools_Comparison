var fast_csv = require('fast-csv');
var tempArray = new Array();
console.log("START");
fast_csv.fromPath("inputfile.txt")
  .on("data", function (data) {
    tempArray.push(data[1]);
  })
  .on("end", function () {
    tempArray.sort();
    console.log(tempArray);

    fast_csv.writeToPath("outputfile.csv", tempArray)
      .on("finish", function () {
        console.log("END");
      });

  });

