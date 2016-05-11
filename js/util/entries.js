export default function* entries () {
  for (const key of Object.keys(this))
    yield [key, this[key]];
};


