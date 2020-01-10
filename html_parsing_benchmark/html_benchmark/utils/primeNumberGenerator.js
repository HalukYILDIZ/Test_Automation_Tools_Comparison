function searchForPrime(end) {
  const primes = [];
  for (let i = 2; i <= end; i++) {
    primes.push(i);

    for (let j = 2; j <= Math.floor(i / 2); j++) {
      if ((i / j) === Math.floor(i / j)) {
        primes.pop();
        break;
      }
    }

  }
  return primes;
}

exports.searchForPrime = searchForPrime;

function testSearchForPrime() {
  const t0 = Date.now();
  console.log(searchForPrime(1000000));
  const t1 = Date.now();
  console.log("duration: " + (t1 - t0));
}



