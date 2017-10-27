var arr = [5,2,4,6,1,3];
var arr2 = [5,2,4,6,1,3];

function insertionSort(a) {
  for (j = 1, len = a.length; j < len; j+=1) {
    let key = a[j];
    // Insert a[j] into the sorted sequence a[1..j-1]
    let i = j-1;
    while (i > -1 && a[i] > key) {
      a[i+1] = a[i];
      i = i-1;
    }
    a[i+1] = key;
  }

  console.log(a);
}

function insertionSort2(a) {
  // start at second to last and move backwards.
  // compare second to last with last.
  for (j = a.length-2; j > -1; j-=1) {
    let key = a[j];
    // Insert a[j] into the sorted sequence a[1..j-1]
    let i = j+1;
    while (i < a.length && a[i] < key) {
      a[i-1] = a[i];
      i = i+1;
    }
    a[i-1] = key;
  }

  console.log(a);
}

// insertionSort(arr);
insertionSort2(arr2);