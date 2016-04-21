import {$id, $title} from './book';
import {$min, $max} from './array';

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

export const $earliestStartDate = books => {
  const startedDates = books.map(book => book.started);
  return $min(startedDates);
};

export const $latestFinishDate = books => {
  const finishedDates = books.map(book => book.finished ? $dateToNum(book.finished) : -Infinity);
  return $max(finishedDates);
};

export const $normalizedBooks = books => {
  const dateBooks = books // {book, date}
  .filter(book => book.started)
  .map(book => ({book, started: $dateToNum(book.started), finished: $dateToNum(book.finished)}));
  const minDate = $min(dateBooks.map(db => db.started));
  const normalizedBooks = dateBooks.map(db => {
    const started = $msToDays(db.started - minDate);
    const finished = $msToDays(db.finished - minDate);
    return {book: db.book, started, finished, duration: finished - started};
  });
  return normalizedBooks;
};

const $msToDays = ms => parseInt(ms/(60*60*24*1000), 10);
const $dateToNum = date => +(date ? new Date(date) : new Date());

export const $avgRating = books => {
  let numOfBooks = 0;
  let totalRating = 0;
  books.forEach(b => {
    if (b.rating === null) return;
    numOfBooks++;
    totalRating += b.rating;
  });
  if (numOfBooks === 0) return null;
  return (totalRating/numOfBooks).toFixed(1);
};

