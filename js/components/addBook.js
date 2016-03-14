import React from 'react';
import get from '../get';
import {$info} from '../util/book';
import {update, actions} from '../store/state';

export default class AddBook extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isbn: '',
      newBook: null,
    };
  }

  render () {
    return (
      <div className='add-book-container'>
        <form className='add-book-input-container' onSubmit={this.onAddBook.bind(this)}>
          <input placeholder='Add book (isbn)' value={this.state.isbn} onChange={this.onIsbnChange.bind(this)} ref='input' />
          {this.getPreview()}
        </form>
      </div>
    );
  }

  renderInput () {
    if (!this.props.open) return null;
  }

  getPreview () {
    const book = this.state.newBook;
    if (!book) return null;
    const info = $info({details: book});
    return <div className='book-preview'>
      <img src={book.items[0].volumeInfo.imageLinks.thumbnail} className='book-cover-preview' />
      <div className='book-details'>
        <h3 className='title'>{info.title}</h3>
        <h4 className='sub-title'>{info.subtitle}</h4>
        <div className='summary'>
          <div className='authors'>by {info.authors ? info.authors.join(', ') : 'Unknown'}</div>
          <div className='page-count'>{info.pageCount} pages</div>
        </div>
        <div className='button-container'>
          <button onClick={this.onAddBook.bind(this)}>Add book to library</button>
        </div>
      </div>
    </div>;
  }

  onToggle (e) {
    e.preventDefault();
    update(actions.toggleAddBook, !this.props.open);
    window.requestAnimationFrame(_ => {
      if (this.props.open) this.refs.input.focus();
    });
  }

  onIsbnChange (e) {
    const isbn = e.target.value;
    this.setState({isbn, newBook: null});
    get(isbn, data => {
      this.setState({
        newBook: data.totalItems ? data : null
      });
    });
  }

  onAddBook (e) {
    e.preventDefault();
    update(actions.addBook, this.state.newBook);
    update(actions.toggleAddBook, false);
    this.setState({isbn: '', newBook: null});
  }
}

