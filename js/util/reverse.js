export default function* reverse () {
  const it = [...this];
  let i = it.length;

  while (i--)
    yield it[i];
};
