import React from 'react';
import {connect} from 'react-redux';
import Header from '../header/Header';
import SummaryItem from './SummaryItem';
import BookNotes from './Notes';
import BookCover from './Cover';
import Rating from './Rating';
import {bookId, bookInfo, bookPhoto, bookCategory} from '../../util/book';
import {modifyBook} from '../../actions/book';
import {removeBook} from '../../actions/books';
import {daysBetween} from '../../util/date';
import {browserHistory} from 'react-router';


class Book extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      showDescription: false
    };
  }

  render () {
    if (!this.props.book) return <div className='book-component not-found'><Header />Book is gone! :´(</div>;

    const book = this.props.book;
    const info = bookInfo(book);
    const duration = daysBetween(book.started, book.finished);

    console.log(book, info);

    return (<div className='book-component'>
      <Header>
        <button onClick={this.removeBook.bind(this)}>Remove book</button>
      </Header>
      <div className='book-display'>
        <div className='sidebar'>
          <BookCover book={book} />
          <Rating rating={book.rating} rate={rating => this.modify({rating})} />
        </div>

        <div className='content'>
          <h1 className='title'>{info.title}</h1>
          <h2 className='authors'>{info.authors.join(', ')}</h2>
          <div className='category'>{bookCategory(book)}</div>

          <button onClick={e => this.setState({showDescription: !this.state.showDescription})}>
            {this.state.showDescription ? 'Hide' : 'See'} description
          </button>
          {this.state.showDescription
            ? <div className='description'>{info.description}</div>
            : null}

          <div className='summary'>
            {this.summaryItem('#', 'number', 'number')}
            <SummaryItem label='Pages' value={info.pageCount} extra={duration ? `${parseInt((book.abandoned || info.pageCount)/duration, 10)} / day` : ''} />
            <SummaryItem label='ISBN' value={info.industryIdentifiers[0].identifier} />
            {this.summaryItem('Bought', 'date', 'bought')}
            {this.summaryItem('Started', 'date', 'started', duration ? `${duration} days` : null)}
            {this.summaryItem('Finished', 'date', 'finished')}
            {this.summaryItem('Abandoned', 'number', 'abandoned')}
            {this.summaryItem('Ex Libris', 'text', 'exLibris')}
          </div>

          <BookNotes book={book} />
        </div>
      </div>
    </div>);
  }

  summaryItem (label, type, key, extra) {
    return <SummaryItem
      editable
      label={label}
      type={type}
      value={this.props.book[key]}
      onChange={this.onSummaryChange.bind(this, key)}
      extra={extra}
    />;
  }

  onSummaryChange(key, value) {
    this.modify({[key]: value});
  }

  modify (modification) {
    this.props.modifyBook(bookId(this.props.book), modification);
  }

  removeBook () {
    if (confirm('Want to remove book?')) {
      this.props.removeBook(bookId(this.props.book));
      browserHistory.push('/');
    }
  }
}

const mapStateToProps = (state, props) => {
  return {
    book: state.books.find(b => bookId(b) === props.params.id)
  };
}

export default connect(mapStateToProps, {modifyBook, removeBook})(Book);

