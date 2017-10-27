/**
 * Towers of hanoi (problem 3)
 */
function hanoi(source, peg1, peg2, n) {
  if (n == 1) {
    var id = (source.id+1) % 3;
    
    if (peg1.id === id) {
      peg1.disks.unshift(source.disks.shift());
    } else {
      peg2.disks.unshift(source.disks.shift());
    }
    console.log(source.disks, peg1.disks, peg2.disks);
  } else {
    hanoi(source, peg1, peg2, n-1);
    hanoi(peg1, peg2, source, 1);
    // hanoi(source, peg2, peg1, n-1);
  }
}

// hoemwork problem 3
var source = {id: 0, disks: [1,2,3]}
  , peg1 = {id: 1, disks: []}
  , peg2 = {id: 2, disks: []}
  , n = source.disks.length
  ;

// move towers
console.log('------------------------------')
console.log(source.disks, peg1.disks, peg2.disks);
hanoi(source, peg1, peg2, n);

console.log((1+1)%3);