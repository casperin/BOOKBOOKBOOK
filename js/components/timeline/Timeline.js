import React from 'react';
import {connect} from 'react-redux';
import Header from '../header/Header';
import reverse from '../../util/reverse';
import to from '../../util/to';
import sorted from '../../util/sorted';
import {bookInfo, avgPagesPerDay} from '../../util/book';
import {earliestStartDate, latestFinishDate, normalizeBooks} from '../../util/books';
import Rating from '../book/Rating';
import cx from 'classname';
import {human, getDateList, daysBetween} from '../../util/date';
const SCALE = 20;
const COLUMN_WIDTH = 100;

class Timeline extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      showBook: null,
    };
  }

  render () {
    if (!this.props.books.length) return null;
    const books = this.props.books;
    const normalizedBooks = normalizeBooks(books)::sorted(book => book.started)::to(Array);
    const totalNumberOfDays = normalizedBooks.reduce((r, b) => b.finished > r ? b.finished : r, 0);
    const dateList = getDateList(earliestStartDate(books), new Date())::reverse()::to(Array);
    const jsxBooks = normalizedBooks.map(this.renderBookColumn.bind(this));
    const containerHeight = SCALE * totalNumberOfDays + SCALE;
    const containerWidth = COLUMN_WIDTH * columns.length;

    return (<div className='timeline-component'>
      <Header location={this.props.location} />
      <ul className='datelist-container'>{dateList.map(this.renderDate.bind(this))}</ul>
      <div className='timeline-container' style={{height: containerHeight, width: containerWidth}} >
        <ul className='booklist-container'>{jsxBooks}</ul>
      </div>
      {this.renderShowBook()}
    </div>);
  }

  renderDate ({human, date}, i) {
    const sunday = date.getDay() === 0;
    return <li style={{top: i * SCALE}} key={human} className={cx({sunday})}>{human}</li>;
  }

  renderBookColumn (db, i) {
    const info = bookInfo(db.book);
    const height = db.book.abandoned ? 3 * SCALE : (db.duration * SCALE) + SCALE;
    const bottom = db.started * SCALE;
    const left = getColumn(i, bottom, height) * COLUMN_WIDTH;
    const rating = 'rating-'+db.book.rating;
    return (<li
      className={cx({abandoned: db.book.abandoned}, rating)}
      style={{height, bottom, left}}
      key={info.title}
      onMouseOver={e => {
        this.setState({showBook: db.book})
      }}
      onMouseOut={e => this.setState({showBook: null})}
    >
      <img src={info.imageLinks.thumbnail} className='timeline-cover-small' />
    </li>);
  }

  renderShowBook () {
    if (!this.state.showBook) return null;
    const book = this.state.showBook;
    const pageCount = bookInfo(book).pageCount;
    const finished = book.finished || new Date();
    const duration = daysBetween(book.started, finished);
    const dates = book.abandoned
      ? null
      : <p>{human(book.started)} &rarr; {human(finished)} ({duration} days)</p>;
    const perDay = book.abandoned
      ? <mark>Abandoned after {book.abandoned} pages.</mark>
      : <p>{parseInt(avgPagesPerDay(book), 10)} pages/day</p>;

    return (<div className='show-book-container' style={{left: 100 + COLUMN_WIDTH * columns.length}}>
      <div className='show-book'>
        <h2>{bookInfo(book).title} <small>by {bookInfo(book).authors.join(', ')}</small></h2>
        <p>{pageCount} pages</p>
        {dates}
        {perDay}
        <Rating {...this.state.showBook} />
      </div>
    </div>);
  }
}

const mapStateToProps = state => {
  return {books: state.books};
};

export default connect(mapStateToProps)(Timeline);

let columns = []; // Used to place books in the right columns without overlapping
const getColumn = (index, bottom, height) => {
  if (index === 0) columns = [];
  const top = bottom + Math.max(height, 100);
  for (const i in columns) {
    if (bottom <= columns[i]) continue;
    columns[i] = top;
    return i;
  }
  columns.push(top);
  return columns.length - 1;
};
