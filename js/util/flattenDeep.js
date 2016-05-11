
export default function* flattenDeep () {
  if (this[Symbol.iterator])
    for (let v of this) yield* flattenDeep(v);
  else
    yield it;
};
