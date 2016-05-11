export default function* map (fn) {
  for (const v of this)
    yield fn(v);
};
