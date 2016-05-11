export default function reduce (fn, init) {
  return arguments.length < 2
    ? [...this].reduce(fn)
    : [...this].reduce(fn, init);
};
