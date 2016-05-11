export default function* compact () {
  for (const v of this)
    if (v) yield v;
};
