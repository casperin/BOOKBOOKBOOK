import contains from './contains';

export default function* difference (itB, fn) {
  for (const v of this)
    if (!itB::contains(v, fn)) yield v;

  for (const v of itB)
    if (!this::contains(v, fn)) yield v;
};
