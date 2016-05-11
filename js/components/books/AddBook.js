import React from 'react';
import {connect} from 'react-redux';
import {fetchBookData} from '../../api/api';
import {bookInfo} from '../../util/book';
import BookCover from '../book/Cover';
import {addBook} from '../../actions/books';

class AddBook extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      open: false,
      cantFind: false,
      book: null
    };
  }

  render () {
    if (!this.state.open) {
      return <div className='book-add-book-component'><button onClick={this.toggle.bind(this)}>Add book</button></div>;
    }

    return (<div className='book-add-book-component'>
      <input onChange={this.fetchBook.bind(this)} onBlur={this.onBlur.bind(this)} ref='input' placeholder='isbn' />
      {this.state.cantFind ? <div className='cant-find'>Can&rsquo;t find that book</div> : null}
      {this.state.book ? this.preview() : null}
    </div>);
  }

  toggle () {
    this.setState({open: !this.state.open});
    window.setTimeout(_ => {
      if (this.state.open && this.refs.input) this.refs.input.focus();
    }, 5);
  }

  onBlur (e) {
    if (!this.state.book && !e.target.value) this.toggle();
  }

  fetchBook (e) {
    this.setState({cantFind: false, book: null});

    fetchBookData(e.target.value, details => {
      if (details.totalItems === 1) {
        this.setState({book: {
          number: null,
          started: null,
          finished: null,
          rating: null,
          notes: '',
          details
        }});
      } else {
        this.setState({cantFind: true});
      }
    });
  }

  preview () {
    const info = bookInfo(this.state.book);
    return (<div className='book-preview'>
      <BookCover book={this.state.book} />
      <div className='info'>
        <h1>{info.title}</h1>
        <small>{info.subtitle}</small>
        <h2>{info.authors.join(', ')}</h2>
        <div className='page-count'>{info.pageCount} pages</div>
        <button
          onClick={e => {
            this.props.addBook(this.state.book);
            this.setState({open: false, book: null});
          }}
          disabled={!this.state.book}
        >Add book</button>
      </div>
    </div>);
  }
}

export default connect(null, {addBook})(AddBook);

