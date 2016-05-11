import React from 'react';
import {connect} from 'react-redux';
import Header from '../header/Header';
import flatMap from '../../util/flatMap';
import map from '../../util/map';
import filter from '../../util/filter';
import group from '../../util/group';
import entries from '../../util/entries';
import sorted from '../../util/sorted';
import to from '../../util/to';
import {Link} from 'react-router';
import cx from 'classname';
import {bookId, bookInfo, bookPhoto} from '../../util/book';
import BookCover from '../book/Cover';
import BookNotes from '../book/Notes';

class Tags extends React.Component {
  render () {
    if (!this.props.tags) return null;

    return (<div className='tags-component'>
      <Header location={this.props.location} />

      <div className='tags-wrapper'>
        <div className='preview-container'>
          {this.props.previews.map(this.renderPreview)}
        </div>

        <div className='sidebar'>
          {this.props.tags.map(([tag, tags]) => {
            const active = tag === this.props.tag;
            return (<div className='tag-item'>
              <Link to={`/tags/${tag}`} key={tag} className={cx({active})}>{tag}</Link>
              <small>{tags.length}</small>
            </div>);
          })}
        </div>
      </div>
    </div>);
  }

  renderPreview ({book, notes}) {
    return (<div className='preview-item' key={bookId(book)}>
      <BookCover book={book} link />
      <div className='preview-notes'>
        {notes.map((note, i) => <BookNotes key={i} book={book} notes={note} locked />)}
      </div>
    </div>);
  }
}

const mapStateToProps = (state, props) => {
  if (!state.books.length) return {};
  const tags = state.books
    ::filter(b => b.notes && b.notes.length)
    ::flatMap(b => b.notes.split('\n\n').filter(note => note.includes('[#')))
    ::flatMap(note => note.match(/(^|\s)\[#[a-z\d-]+\]/ig))
    ::map(tag => tag.replace(' [#', '').replace(']', ''))
    ::group()
    ::entries()
    ::sorted(([_, tags]) => -tags.length)
    ::to(Array);

  const tag = props.params.tag || tags[0][0];

  return {
    tag,
    tags,
    previews: state.books
      ::filter(b => b.notes && b.notes.includes(`[#${tag}]`))
      ::map(b => ({
        book: b,
        notes: b.notes.split('\n\n').filter(n => n.includes(`[#${tag}]`))
      }))
      ::to(Array)
  };
};

export default connect(mapStateToProps)(Tags);

