export default function* dropLast (n = 1) {
  for (const v of [...this].slice(0, -n))
    yield v;
};
