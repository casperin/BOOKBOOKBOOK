const id = x => x;

export default function all (fn = id) {
  for (const v of this)
    if (!fn(v)) return false;
  return true;
};
