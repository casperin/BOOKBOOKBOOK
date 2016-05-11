export default function* take (n = 1) {
  for (const v of this) {
    if (n-- < 1) break;
    yield v;
  }
};

