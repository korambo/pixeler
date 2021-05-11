export const debounce = (f, ms) => {
  let isCd = false;
  return (...args) => {
    if (isCd) return;
    f.apply(this, args);
    isCd = true;
    setTimeout(() => { isCd = false; }, ms);
  };
};

// todo
export const logger = {
  // eslint-disable-next-line no-console
  log: debounce((...args) => console.log(...args), 1000),
  // eslint-disable-next-line no-console
  table: debounce((...args) => console.table(...args), 1000),
};
