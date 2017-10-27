/**
 * Towers of hanoi (problem 2)
 */
function hanoi(source, peg1, peg2, n) {
  if (n === 1) {
    peg2.unshift(source.shift());
    console.log(source, peg1, peg2);
  } else {
    hanoi(source, peg2, peg1, n-1);
    hanoi(source, peg1, peg2, 1);
    hanoi(peg1, source, peg2, n-1);
  } 
}

// homework problem 2
var source = [1,2,3]
  , peg1 = []
  , peg2 = []
  , n = source.length
  ;

// move towers
console.log(source, peg1, peg2);
hanoi(source, peg1, peg2, n);
