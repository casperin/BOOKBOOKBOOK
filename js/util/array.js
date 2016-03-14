export const sortBy = (key, arr) => {
  return arr.slice(0).sort((x, y) => (+ new Date(y[key])) - (+ new Date(x[key])));
}

export const swap = (arr, index, item) => [
  ...arr.slice(0, index),
  item,
  ...arr.slice(index+1)
];

export const remove = (arr, index) => [
  ...arr.slice(0, index),
  ...arr.slice(index+1)
];

export const $min = arr => arr.reduce((m, x) => (!x || m < x) ? m : x);
