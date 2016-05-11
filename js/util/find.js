export default function find (fn, notFound = null) {
  for (const v of this)
    if (fn(v)) return this;

  return notFound;
};
