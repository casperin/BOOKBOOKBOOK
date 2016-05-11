const min = arr => arr.reduce((m, x) => (!x || m < x) ? m : x);
const max = arr => arr.reduce((m, x) => (!x || m > x) ? m : x);

export const earliestStartDate = books => {
  const startedDates = books.map(book => book.started);
  return min(startedDates);
};

export const latestFinishDate = books => {
  const finishedDates = books.map(book => book.finished ? dateToNum(book.finished) : -Infinity);
  return max( finishedDates);
};

export const normalizeBooks = books => {
  const dateBooks = books // {book, date}
  .filter(book => book.started)
  .map(book => ({book, started: dateToNum(book.started), finished: dateToNum(book.finished)}));
  const minDate = min(dateBooks.map(db => db.started));
  const normalizedBooks = dateBooks.map(db => {
    const started = msToDays(db.started - minDate);
    const finished = msToDays(db.finished - minDate);
    return {book: db.book, started, finished, duration: finished - started};
  });
  return normalizedBooks;
};

const msToDays = ms => parseInt(ms/(60*60*24*1000), 10);
const dateToNum = date => +(date ? new Date(date) : new Date());
