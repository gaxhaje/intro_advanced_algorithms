function findMajorityElem(a) {
  var len = a.length
    , mid = Math.floor(len/2)
    ;
  
  if (len === 1) return a[0];   // this is the base case.

  var l_elem = findMajorityElem(a.slice(0, mid))  // mid not inclusive
    , r_elem = findMajorityElem(a.slice(mid, len))
    ;

  if (l_elem === -1 && r_elem >= 0) return r_elem;
  else if (l_elem >= 0 && r_elem === -1) return l_elem;
  else if (l_elem === r_elem) return l_elem;
  else return -1;
}

var a = [1, 2, 1, 4, 2, 2, 6, 1, 2];
console.log(findMajorityElem(a));