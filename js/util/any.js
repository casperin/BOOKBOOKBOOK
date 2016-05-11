const id = x => x;

export default function any (fn = id) {
  for (const v of this)
    if (fn(v)) return true;
  return false;
};

