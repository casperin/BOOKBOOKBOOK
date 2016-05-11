import contains from './contains';

export default function* intersection (itB) {
  for (const v of this)
    if (itB::contains(v)) yield v;
};
