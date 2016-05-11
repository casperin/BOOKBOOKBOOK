import drop from './drop';
import take from './take';

export default function slice (n, m) {
  return this
    ::drop(n)
    ::take(m - n);
};
