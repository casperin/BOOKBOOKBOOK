import contains from './contains';

const id = x => x;

export default function* unique (fn = id) {
  const seen = [];

  for (const v of this) {
    if (!seen::contains(v, fn)) {
      seen.push(v);
      yield v;
    }
  }
};
