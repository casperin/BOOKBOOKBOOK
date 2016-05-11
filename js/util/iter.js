export default function* iter () {
  for (const v of this)
    yield v;
};
