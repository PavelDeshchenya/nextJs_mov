function getUnique(arr) {
  arr.filter((el, index) => index === arr.indexOf(el));
}
