import {daysBetween} from './date';

export const bookInfo = book => book ? book.details.items[0].volumeInfo : null;
export const bookId = book => book ? book.details.items[0].id : null;
export const bookPhoto = book => book ? bookInfo(book).imageLinks.thumbnail : null;

export const avgPagesPerDay = book => {
  const finished = book.finished || new Date();
  const duration = daysBetween(book.started, finished);
  return bookInfo(book).pageCount / duration;
}

export const isReading = book => {
  if (!book.started) return false;
  if (book.finished) return false;
  if (book.abandoned) return false;
  return true;
}
