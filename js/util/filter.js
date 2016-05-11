export default function* filter (fn) {
  for (const v of this)
    if (fn(v)) yield v;
};
