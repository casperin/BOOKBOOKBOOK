import React from 'react';
import {$info, $id} from '../util/book';
import {$daysSince, $humanDate} from '../util/date';
import {update, actions} from '../store/state';
import Stars from './rating';
import get from '../get';
import classname from 'classname';

export default class Show extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      showDescription: false
    }
  }

  render () {
    const book = this.props.book;
    const info = $info(book);
    return (<div className='page show-book-container'>
      <div className='show-book-header'>
        <button className='remove-book' onClick={this.remove.bind(this)}>Remove</button>
        <button onClick={this.dump.bind(this)}>Print</button>
        <button className='close-show' onClick={this.close}>Close</button>
      </div>
      <div className='show-book'>
        <div className='cover-container'>
          <img src={info.imageLinks.thumbnail} className='cover' />
          <Stars rate={this.rate.bind(this)} rating={book.rating} />
        </div>
        <div className='show-book-info'>
          <h1 className='title'>{info.title}</h1>
          <h2 className='sub-title'>{info.subtitle}</h2>
          <div className='summary'>
            <div className='authors'>by {info.authors ? info.authors.join(', ') : 'Unknown'}</div>
            <div className='page-count'>{info.pageCount} pages</div>
            <a
              href='#'
              className={info.description ? '' : 'hide'}
              onClick={e => {
                e.preventDefault();
                this.setState({showDescription: !this.state.showDescription});
              }}>{this.state.showDescription ? 'Hide description' : 'Description'}</a>
          </div>
          <div className={classname('description', {hide: !this.state.showDescription || !info.description})}>
            {(info.description && this.state.showDescription) ? info.description : null}
          </div>
          <hr />
          <label className='number-container'>
            <span>Book #</span>
            <span className='human'>{typeof book.number === 'number' ? book.number : 'N/A'}</span>
            <input onChange={this.setValue.bind(this, 'number')} value={book.number} />
          </label>
          <label className='bought'>
            <span>Bought</span>
            <span className='human'>{book.bought ? $humanDate(book.bought) : '-'}</span>
            <input onChange={this.setValue.bind(this, 'bought')} value={book.bought} type='date' />
          </label>
          <label className='started'>
            <span>Started</span>
            <span className='human'>{book.started ? $humanDate(book.started) : '-'}</span>
            <input onChange={this.setValue.bind(this, 'started')} value={book.started} type='date' />
          </label>
          <label className='finished'>
            <span>Finished</span>
            {this.getFinished(book)}
            <input onChange={this.setValue.bind(this, 'finished')} value={book.finished} type='date' />
          </label>
          <label className={classname('abandoned', {muted: !book.abandoned})}>
            <span>Abandoned</span>
            <span className='human'>{book.abandoned ? book.abandoned + ' pages in' : '-'}</span>
            <input onChange={this.setValue.bind(this, 'abandoned')} value={book.abandoned} type='number' placeholder='at number of pages' />
          </label>
          <label className={classname('ex-libris', {muted: !book.exLibris})}>
            <span>Ex Libris</span>
            <span className='human'>{book.exLibris ? book.exLibris : '-'}</span>
            <input onChange={this.setValue.bind(this, 'exLibris')} value={book.exLibris} placeholder='Lent out to...' />
          </label>
          <label className='notes'>
            <span>Notes</span>
            <textarea value={book.notes || ''} onChange={this.setValue.bind(this, 'notes')} />
          </label>
        </div>
      </div>
    </div>);
  }

  getFinished (book) {
    if (!book.finished) return '-';
    return (<span className='human'>
      {$humanDate(book.finished)}
      <small> ({$daysSince(book.started, book.finished)} days)</small>
    </span>);
  }

  close (e) {
    e && e.preventDefault();
    update(actions.show, null);
  }

  rate (value) {
    update(actions.editBook, {id: $id(this.props.book), key: 'rating', value});
  }

  setValue (key, e) {
    const val = e.target.value.length === 0 ? null : e.target.value;
    const value = key === 'number' || key === 'abandoned' ? Number(val) : val;
    update(actions.editBook, {id: $id(this.props.book), key, value});
  }

  remove (e) {
    e.preventDefault();
    if (window.confirm('want to remove this books from collection?')) {
      update(actions.removeBook, $id(this.props.book));
      this.close();
    }
  }

  dump () {
    const info = $info(this.props.book);
    console.log('----', info.title, '----');
    console.log(this.props.book);
    console.log(info);
  }
}

Show.propTypes = {
  book: React.PropTypes.object
};


