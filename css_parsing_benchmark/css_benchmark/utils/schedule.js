function shuffle(baseArray) {
  var baseLength = baseArray.length, temp, index;

  // While there are elements in the array
  while (baseLength > 0) {
    // Pick a random index
    index = Math.floor(Math.random() * baseLength);
    // Decrease baseLength by 1
    baseLength--;
    // And swap the last element with it
    temp = baseArray[baseLength];
    baseArray[baseLength] = baseArray[index];
    baseArray[index] = temp;
  }
  return baseArray;
}

function testShuffle() {
  let myArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  console.log(shuffle(myArray));
}

function testCreateSchedule() {
  console.table(createSchedule(3, 1000));
}

function createSchedule(toolCount, runCount) {
  let baseArray = createBaseArray(toolCount);
  const scheduleArray = [];
  for (let i = 0; i < runCount; i++) {
    scheduleArray.push([...shuffle(baseArray)]);
  }

  return scheduleArray;
}

exports.createSchedule = createSchedule;

function createBaseArray(toolCount) {
  let baseArray = [];
  for (let i = 0; i < toolCount; i++) {
    baseArray.push(i);
  }

  return baseArray;
}

function main() {
  testCreateSchedule();
}
// main();