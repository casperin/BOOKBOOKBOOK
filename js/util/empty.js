export default function empty () {
  for (const v of this) return false;
  return true;
};

