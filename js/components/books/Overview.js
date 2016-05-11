import React from 'react';
import {connect} from 'react-redux';
import {bookId, bookInfo} from '../../util/book';
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
      ? books::sorted(b => -b.number)::to(Array)
      : books,
    filter: state.components.booksOverview.filter
  };
};

export default connect(mapStateToProps)(BooksOverview);

