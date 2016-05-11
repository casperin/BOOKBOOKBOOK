const id = x => x;

export default function contains (value, fn = id) {
  for (const v of this)
    if (fn(v) === fn(value)) return true;

  return false;
};
