import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {showSidebar, setFilter} from '../../actions/notes';
import cx from 'classname';
import Header from '../header/Header';
import BookNotes from '../book/Notes';
import {isReading, bookInfo, bookId, bookPhoto} from '../../util/book';
import sorted from '../../util/sorted';
import map from '../../util/map';
import partition from '../../util/partition';
import filter from '../../util/filter';
import flatMap from '../../util/flatMap';
import flatten from '../../util/flatten';
import group from '../../util/group';
import entries from '../../util/entries';
import to from '../../util/to';

class Notes extends React.Component {
  render () {
    if (!this.props.currentBook) return null;

    return (<div className='notes-component'>
      <Header location={this.props.location}>
        <input
          value={this.props.filter}
          onChange={e => this.props.setFilter(e.target.value)}
          placeholder='Filter notes' />
      </Header>

      <div className='notes-wrapper'>
        <div className='sidebar'>
          <div className='sidebar-header'>
            <a href='#' onClick={this.showSidebar.bind(this, 'WITH')} className={cx({active: this.props.show === 'WITH'})}>
              With notes
            </a>
            <a href='#' onClick={this.showSidebar.bind(this, 'WITHOUT')} className={cx({active: this.props.show === 'WITHOUT'})}>
              Without notes
            </a>
          </div>
          <div className='sidebar-list'>
            {this.props.currentBooks.map((b, i) => {
              const id = bookId(b);
              const info = bookInfo(b);
              return (<Link key={id} className={cx('sidebar-item', {active: id === bookId(this.props.currentBook)})} to={`/notes/${id}`}>
                <img src={bookPhoto(b)} />
                <div className='info'>
                  <h1>{info.title}</h1>
                  <h2>{info.authors.join(', ')}</h2>
                </div>
              </Link>)
            })}
          </div>
        </div>

        <div className='content'>
          <h1>
            {bookInfo(this.props.currentBook).title}
            <Link to={`/book/${bookId(this.props.currentBook)}`}>Open</Link>
          </h1>
          <BookNotes
            book={this.props.currentBook}
            highlight={this.props.filter}
          />
        </div>
      </div>
    </div>);
  }

  showSidebar (show, e) {
    e.preventDefault();
    this.props.showSidebar(show);
  }
}

const mapStateToProps = (state, props) => {
  if (!state.books.length) return {};
  const [withNotes, withoutNotes] = state.books::partition(b => b.notes && b.notes.length);

  const booksWithNotes = withNotes::sorted(b => isReading(b) ? -Infinity : -b.notes.length)
  const booksWithoutNotes = withoutNotes::sorted(b => isReading(b) ? -Infinity : -b.rating)
  const currentBook = state.books.find(b => bookId(b) === props.params.id) || booksWithNotes[0];
  const show = state.components.notes.showSidebar || (booksWithNotes.includes(currentBook) ? 'WITH' : 'WITHOUT');

  return {
    currentBook,
    currentBooks: (show === 'WITH' ? booksWithNotes::filter(b => b.notes.includes(state.components.notes.filter)) : booksWithoutNotes)::to(Array),
    show,
    filter: state.components.notes.filter,
    tags: withNotes
      ::flatMap(b => b.notes.split('\n\n').filter(note => note.includes('[#')))
      ::flatMap(note => note.match(/(^|\s)\[#[a-z\d-]+\]/ig))
      ::map(tag => tag.replace(' [#', '').replace(']', ''))
      ::group()
      ::entries()
      ::sorted(([_, tags]) => -tags.length)
      ::to(Array)
  };
};

export default connect(mapStateToProps, {showSidebar, setFilter})(Notes);

