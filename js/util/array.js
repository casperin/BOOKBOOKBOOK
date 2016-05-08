export const sortBy = (key, arr) => {
  return arr.slice(0).sort((x, y) => (+ new Date(y[key])) - (+ new Date(x[key])));
}

export const $sortWith = (fn, arr) => arr.slice(0).sort(fn);

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
export const $max = arr => arr.reduce((m, x) => (!x || m > x) ? m : x);
export const $reverse = arr => {
  const result = [];
  let i = arr.length;
  while (i--) result.push(arr[i]);
  return result;
}

export function $sortBy (fn, array) {
  return array.slice(0).sort((x, y) => fn(x) - fn(y));
}

export function empty (array) {
  return array.length === 0;
}
