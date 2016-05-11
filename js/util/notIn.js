import contains from './contains';

export default function* notIn (itB, fn) {
  for (const v of this)
    if (!itB::contains(v, fn)) yield v;
};

