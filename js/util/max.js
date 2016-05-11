const id = x => x;

export default function max (fn = id) {
  return [...this].reduce((a, b) => fn(a) > fn(b) ? a : b);
};
