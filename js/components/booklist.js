import React from 'react';
import BookListHeader from './bookListHeader';
import TagList from './tagList';
import BookItem from './bookItem';
import AddBook from './addBook';
import {sortBy} from '../util/array';
import {$info, $id} from '../util/book';
import {update, actions} from '../store/state';

export default class BookList extends React.Component {
  render () {
    if (!this.props.books || !this.props.books.length) return (
      <div>
        <AddBook {...this.props.ui.addBook} />
        <p className='no-books'><mark>You have no books!</mark></p>
      </div>
    );
    const books = filterAndSort(this.props.ui.filterString, this.props.ui.filter, this.props.books);
    return (<div className='book-list-container'>
      <BookListHeader {...this.props} />
      <TagList books={this.props.books} />
      <ul className='book-list'>
        {books.map((book) => <BookItem key={$id(book)} onClick={this.showBook.bind(this, book)} {...book} />)}
      </ul>
    </div>);
  }

  showBook (book) {
    update(actions.show, $id(book));
  }
};

const sort = books => {
  const sortFn = book => {
    if (book.finished) return new Date(book.finished);
    if (book.started) return new Date(book.started);
    if (book.bought) return new Date(book.bought);
    return -Infinity;
  }
  return books.slice(0).sort((x, y) => sortFn(y) - sortFn(x));
}

const filter = (filterString, filter, books) => {
  if (filterString) {
    books = books.filter(b => {
      const strings = filterString.split(' ');
      const info = $info(b);
      for (const string of strings) {
        if ((info.title + info.subtitle + info.authors.join('')).toLowerCase().indexOf(string.toLowerCase()) === -1) return false;
      }
      return true;
    });
  }
  switch (filter) {
    case 'finished': return books.filter(b => b.finished);
    case 'reading': return books.filter(b => b.started && !b.abandoned && !b.finished);
    case 'unread': return books.filter(b => !b.started && !b.abandoned);
    case '5-stars': return books.filter(b => b.rating === 5);
    case '4-stars': return books.filter(b => b.rating === 4);
    case '3-stars': return books.filter(b => b.rating === 3);
    case '2-stars': return books.filter(b => b.rating === 2);
    case '1-stars': return books.filter(b => b.rating === 1);
    case 'abandoned': return books.filter(b => b.abandoned);
    case 'exLibris': return books.filter(b => b.exLibris);
    case 'unrated': return books.filter(b => b.rating === null);
    default: return books;
  }
}

const filterAndSort = (filterString, selection, books) => filter(filterString, selection, sort(books));
