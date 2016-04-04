import {$daysSince} from './date';

export const $info = book => book.details.items[0].volumeInfo;
export const $title = book => book.details.items[0].volumeInfo.title;
export const $isbn = book => {
  const isbn = $info(book).industryIdentifiers.find(id => id.type === 'ISBN_10')
  return isbn ? isbn.identifier : '-';
}
export const $id = book => book.details.items[0].id;

export const $avgPagesPerDay = book => {
  const finished = book.finished || new Date();
  const duration = $daysSince(book.started, finished);
  return $info(book).pageCount / duration;
}
