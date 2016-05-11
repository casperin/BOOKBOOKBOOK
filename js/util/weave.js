import iter from './iter';

export default function* weave (itB) {
  const it = iter(itB);

  for (const v of this) {
    yield v;

    const {done, value} = it.next();
    if (!done) yield value;
  }

  while (true) {
    const {done, value} = it.next();
    if (done) break;
    yield value;
  }
};
