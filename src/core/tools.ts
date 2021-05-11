export const debounce = (f, ms) => {
  let isCd = false;
  return function(...args) {
    if (isCd) return;
    f.apply(this, args);
    isCd = true;
    setTimeout(() => isCd = false, ms);
  };
}

export const logger = {
  log: debounce((...args) => console.log(...args), 1000),
  table: debounce((...args) => console.table(...args), 1000)
};
