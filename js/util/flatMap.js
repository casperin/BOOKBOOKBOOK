import map from './map';
import flatten from './flatten';

export default function flatMap (fn) {
  return this::map(fn)::flatten();
};

