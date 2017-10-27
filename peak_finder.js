/**
 * Find 1D-Peak
 */

function findPeak1D(arr, low, high) {
  var mid = parseInt((low+high)/2);

  // presume that `arr` does not have bounderies. 
  // Therefore, we need to check for 'undefined'
  // when we goto get arr[-1] and arr[arr.length]
  // as they will return 'unefined'.
  var left   = typeof arr[mid-1] === 'undefined' ? 0 : arr[mid-1]
    , middle = arr[mid]
    , right  = typeof arr[mid+1] === 'undefined' ? 0 : arr[mid+1]
    ;

  // 1. compare (i-i), (i), (i+1)
  // 2. Pick left columns if (i-1) > (i)
  // 3. Pick right columns if (i+1) > (i)
  if (left <= middle && middle >= right) return middle;     // peak (best case)
  if (middle < left)  return findPeak1D(arr, low, high-1);  // look left
  if (middle < right) return findPeak1D(arr, mid+1, high);  // look right
}

/**
 * Find Max Peak on Column (i,j)
 */

function findMax(arr, rows, mid) {
  // 1. find global max on column j (mid) at (i, j)
  var max = arr[0][mid]
    , idx = 0
    ;
  for (var i = 1; i < rows; i +=1) {
    var tmp = arr[i][mid];
    if (tmp > max) {
      max = tmp;
      idx = i;
    }
  }
  return idx;
}

/**
 * Find 2D-Peak
 */

function findPeak2D(arr, rows, colLow, colHigh) {
  // 1. find global max on column j at (i,j)
  var mid = parseInt((colLow+colHigh)/2)
    , max = findMax(arr, rows, mid)
    ;

  var left   = typeof arr[max][mid-1] === 'undefined' ? 0 : arr[max][mid-1]
    , middle = arr[max][mid]
    , right  = typeof arr[mid+1] === 'undefined' ? 0 : arr[mid+1]
    ;
  
  // 2. compare (i,j-i), (i,j),(i,j+1)
  // 3. Pick left columns if (i,j-1) > (i,j)
  // 4. Pick right columns if (i,j+1) > (i,j)
  if (left <= middle && middle >= right) return middle;     // peak (best case)
  if (middle < left)  return findPeak2D(arr, rows, colLow, colHigh-1);  // look left
  if (middle < right) return findPeak2D(arr, rows, mid+1, colHigh);  // look right
}

// find a 1d-peak
var arr = [9,4,5,4,7,6]
  , low = 0
  , high = arr.length-1
  ;

var peak1D = findPeak1D(arr, low, high);
console.log(peak1D + ' is a 1D-peak because all it\'s neighbors are smaller or equal to it.');


// find a peak by devide & counqer (2-Dimensional) array
var arr = [
      [6,4,5,4,7],
      [4,3,9,2,1],
      [5,4,6,3,8]
    ]
  , rows = arr.length
  , cols = arr[0].length
  , colLow = 0
  , colHigh = arr[0].length-1
  ;

// find a 2d-peak
var peak2D = findPeak2D(arr, rows, colLow, colHigh);
console.log(peak2D + ' is a 2D-peak because all it\'s neighbors are smaller or equal to it.');
