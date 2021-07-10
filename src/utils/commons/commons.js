// call 3 seconds await timeout(3000);
function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
