export default function* last (n = 1) {
  for (const v of [...this].slice(-n))
    yield v;
};


