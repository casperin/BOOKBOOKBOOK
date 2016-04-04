import React from 'react';
import {update, actions} from '../store/state';
import QuickStats from './quickstats';
import {$reverse, sortBy, $sortWith} from '../util/array';
import {$title, $info, $avgPagesPerDay} from '../util/book';
import {$earliestStartDate, $latestFinishDate, $normalizedBooks} from '../util/books';
import {$dateList, $humanDateDay, $daysSince} from '../util/date';
import Rating from './rating';
import classname from 'classname';
const SCALE = 20;

class Stats extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      showBook: null,
    };
  }

  render () {
    const books = this.props.books;
    const normalizedBooks = sortBy('started', $normalizedBooks(books));
    const totalNumberOfDays = normalizedBooks.reduce((r, b) => b.finished > r ? b.finished : r, 0);
    const dateList = $reverse($dateList($earliestStartDate(books), new Date()));
    const jsxBooks = normalizedBooks.map(this.renderBookColumn.bind(this));
    const containerHeight = SCALE * totalNumberOfDays + SCALE;
    const containerWidth = 50 * columns.length;
    return (<div className='stats-container'>
      <div className='stats-header'>
        <div className='main'>
          <button onClick={_ => {update(actions.showStats, false)}}>Back</button>
        </div>
        <QuickStats books={this.props.books} />
      </div>
      <ul className='datelist-container'>{dateList.map(this.renderDate.bind(this))}</ul>
      <div className='timeline-container' style={{height: containerHeight, width: containerWidth}} >
        <ul className='booklist-container'>{jsxBooks}</ul>
      </div>
      {this.renderShowBook()}
    </div>);
  }

  renderDate ({human, date}, i) {
    const sunday = date.getDay() === 0;
    return <li style={{top: i * SCALE}} key={human} className={classname({sunday})}>{human}</li>;
  }

  renderBookColumn (db, i) {
    const info = $info(db.book);
    const height = db.book.abandoned ? 3 * SCALE : (db.duration * SCALE) + SCALE;
    const bottom = db.started * SCALE;
    const left = getColumn(i, bottom, height) * 50;
    const rating = 'rating-'+db.book.rating;
    return (<li
      className={classname({abandoned: db.book.abandoned}, rating)}
      style={{height, bottom, left}}
      key={info.title}
      onMouseOver={e => {
        this.setState({showBook: db.book})
      }}
      onMouseOut={e => this.setState({showBook: null})}
    >
      <img src={info.imageLinks.thumbnail} className='stats-cover-small' />
    </li>);
  }

  renderShowBook () {
    if (!this.state.showBook) return null;
    const book = this.state.showBook;
    const pageCount = $info(book).pageCount;
    const finished = book.finished || new Date();
    const duration = $daysSince(book.started, finished);
    const dates = book.abandoned
      ? null
      : <p>{$humanDateDay(book.started)} &rarr; {$humanDateDay(finished)} ({duration} days)</p>;
    const perDay = book.abandoned
      ? <mark>Abandoned after {book.abandoned} pages.</mark>
      : <p>{parseInt($avgPagesPerDay(book), 10)} pages/day</p>;

    return (<div className='show-book-container' style={{left: 100 + 50 * columns.length}}>
      <div className='show-book'>
        <h2>{$title(book)} <small>by {$info(book).authors.join(', ')}</small></h2>
        <p>{pageCount} pages</p>
        {dates}
        {perDay}
        <Rating {...this.state.showBook} />
      </div>
    </div>);
  }
}

export default Stats;

let columns = []; // Used to place books in the right columns without overlapping
const getColumn = (index, bottom, height) => {
  if (index === 0) columns = [];
  const top = bottom + height;
  for (const i in columns) {
    if (top >= columns[i]) continue;
    columns[i] = bottom;
    return i;
  }
  columns.push(bottom);
  return columns.length - 1;
};


