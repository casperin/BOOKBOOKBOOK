import React from 'react';
import {connect} from 'react-redux';
import {bookId, bookInfo, isReading} from '../../util/book';
import {Link} from 'react-router';
import BookCover from '../book/Cover';
import sorted from '../../util/sorted';
import to from '../../util/to';

class BooksOverview extends React.Component {
  render () {
    if (!this.props.books) return null;

    return (<div className='books-overview-component'>
      {this.props.books
        .filter(this.applyTabs.bind(this))
        .filter(this.filterBook.bind(this))
        .map(book => <BookCover book={book} link key={bookId(book)} />)}
    </div>);
  }

  applyTabs (book) {
    const tab = this.props.tab;
    if (tab === 'all') return true;

    if (tab === 'read') {
      if (isReading(book)) return true;
      if (book.finished) return true;
      if (book.abandoned) return true;
      return false;
    }

    if (tab === 'unread') {
      if (book.started) return false;
      return true;
    }

    if (tab === 'owned') {
      return book.number != null;
    }
  }

  filterBook (book) {
    const filter = this.props.filter.toLowerCase();
    const info = bookInfo(book);
    if (info.title.toLowerCase().includes(filter)) return true;
    if (info.authors.join('').toLowerCase().includes(filter)) return true;
    return false;
  }
}

const mapStateToProps = (state, props) => {
  const books = props.books || state.books;

  return {
    books: props.tab === 'owned'
      ? books::sorted(b => -b.number)
      : books::sorted(sort),
    filter: state.components.booksOverview.filter
  };
};

const sort = book => {
  if (isReading(book)) return -Infinity;
  if (book.finished) return -new Date(book.finished);
  if (book.started) return -new Date(book.started);
  if (book.bought) return -new Date(book.bought);
  return Infinity;
};

export default connect(mapStateToProps)(BooksOverview);

