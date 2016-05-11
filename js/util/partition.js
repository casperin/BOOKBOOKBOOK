import filter from './filter';
import reject from './reject';

export default function partition (fn) {
  return [
    this::filter(fn),
    this::reject(fn)
  ];
};
