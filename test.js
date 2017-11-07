

function calc(data) {
  var calc = [];
  for (var i=0, len=data.length; i<len; i++) {
    calc[i] = data[i+1] - data[i];
  }

  calc = [ -2, -3, 1, 4, 2, -8, 4, -5 ];
  console.log(calc);

  var result = calc[0];
  for (var i=1, len=calc.length; i<len; i++) {
    if (calc[i-1] > 0) calc[i] += calc[i-1];
    if (result < calc[i]) result = calc[i];
    console.log('result: ', result);
  }
  return result;
}

console.log(calc([7,5,2,3,7,9,1,5]));