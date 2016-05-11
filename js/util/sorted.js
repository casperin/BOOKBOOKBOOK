const id = x => x;

export default function sorted (fn = id) {
  return [...this].sort((x, y) => fn(x) - fn(y));
};
