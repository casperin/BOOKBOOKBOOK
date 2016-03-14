import {$id} from './book';

export const $index = (books, id) => {
  for (let i = 0, len = books.length; i < len; i++)
    if ($id(books[i]) === id) return i;
  return -1;
}

export const $makeBook = details => {
  if (details.totalItems === 0) return undefined;
  return {
    number: null,
    started: null,
    finished: null,
    rating: null,
    notes: '',
    details
  }
};
