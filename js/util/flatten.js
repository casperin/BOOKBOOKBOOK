export default function* flatten () {
  for (let v of this)
    yield* v;
};
