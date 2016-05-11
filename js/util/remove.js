export default function* remove (item) {
  for (const v of this)
    if (v !== item) yield v;
};
