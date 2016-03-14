import React from 'react';
import {$info} from '../util/book';
import {$startDates} from '../util/books';
import {$min} from '../util/array';
import {$daysSince, $humanDate} from '../util/date';

export default class BookListHeader extends React.Component {
  render () {
    const books = this.props.books;
    return (<div className='quick-stats-container'>
      <ul className='quick-stats-list'>
        <li>
          <span className='label'>Books</span>
          <span className='value'>{getNumberOfBooks(books)}</span>
        </li>
        <li>
          <span className='label'>Pages</span>
          <span className='value'>{getNumberOfPages(books)}</span>
        </li>
        <li>
          <span className='label'>Pages/day</span>
          <span className='value'>{averagePagesPerDay(books)} <small>since {$humanDate(earliestStartDate(books))}</small></span>
        </li>
      </ul>
    </div>);
  }
}

const getNumberOfBooks = books => books.length;

const getNumberOfPages = books =>
  books.reduce((pages, book) => pagesRead(book) + pages, 0);

const pagesRead = book => {
  if (book.abandoned) return book.abandoned;
  if (book.finished) return $info(book).pageCount;
  return 0;
}

const earliestStartDate = books => {
  const startedDates = books.map(book => book.started);
  return $min(startedDates);
}

const averagePagesPerDay = books => {
  const startDate = earliestStartDate(books);
  const days = $daysSince(startDate);
  const pages = getNumberOfPages(books);
  return parseInt((pages/days), 10);
}


