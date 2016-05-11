import iter from './iter';

/**
 * 'abc'::listsToObject('de');
 * // {a: 'd', b: 'd'}
 */
export default function listsToObject (itB) {
  const keysIter = this::iter();
  const valuesIter = itB::iter();
  const result = {};

  for (const key of keysIter) {
    const {value, done} = valuesIter.next();
    if (done) break;
    result[key] = value;
  }

  return result;
};
