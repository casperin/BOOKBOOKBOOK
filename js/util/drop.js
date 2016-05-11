export default function* drop (n = 1) {
  for (const v of this) {
    if (n === 0) yield v;
    else n--;
  }
};
