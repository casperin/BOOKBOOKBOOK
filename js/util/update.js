export default function* update (index, item) {
  let i = 0;

  for (const v of this) {
    yield index === i
      ? item
      : v;
    i++;
  }
}
