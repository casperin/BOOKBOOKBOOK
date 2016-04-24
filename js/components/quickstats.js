import React from 'react';
import {$info} from '../util/book';
import {$startDates, $earliestStartDate} from '../util/books';
import {$daysSince, $humanDate} from '../util/date';
import {update, actions} from '../store/state';

export default class BookListHeader extends React.Component {
  render () {
    const books = this.props.books;
    const statsLink = this.props.showLink
      ? <li><a href='#' onClick={this.showStats.bind(this)}>Stats</a></li>
      : null;
    return (<div className='quick-stats-container'>
      <ul className='quick-stats-list'>
        {statsLink}
        <li>
          <span className='label'>Books</span>
          <span className='value'>{books.filter(book => book.finished).length}</span>
        </li>
        <li>
          <span className='label'>Pages</span>
          <span className='value'>{getNumberOfPages(books)}</span>
        </li>
        <li>
          <span className='label'>Pages/day</span>
          <span className='value'>{averagePagesPerDay(books)} <small>since {$humanDate($earliestStartDate(books))}</small></span>
        </li>
      </ul>
    </div>);
  }

  showStats (e) {
    e.preventDefault();
    update(actions.showStats, true);
  }
}

const getNumberOfPages = books =>
  books.reduce((pages, book) => pagesRead(book) + pages, 0);

const pagesRead = book => {
  if (book.abandoned) return book.abandoned;
  if (book.finished) return $info(book).pageCount;
  return 0;
}

const averagePagesPerDay = books => {
  const startDate = $earliestStartDate(books);
  const days = $daysSince(startDate);
  const pages = getNumberOfPages(books);
  return parseInt((pages/days), 10);
}


