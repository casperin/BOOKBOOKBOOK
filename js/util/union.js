import contains from './contains';

export default function* union (itB) {
  for (const v of this)
    if (itB::contains(v)) yield v;
};
