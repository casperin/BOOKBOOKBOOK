import React from 'react';
import {$info, $id, $title, $notesLIst} from '../util/book';
import map from '../util/iters/map';
import to from '../util/iters/to';
import compact from '../util/iters/compact';
import filter from '../util/iters/filter';
import flatten from '../util/iters/flatten';
import reject from '../util/iters/reject';
import entries from '../util/iters/entries';
import {empty} from '../util/array';
import reduce from '../util/iters/reduce';
import group from '../util/iters/group';
import sorted from '../util/iters/sorted';
import {$avgRating} from '../util/books';
import {$toTitle} from '../util/string';
import {$sortBy} from '../util/array';
import {update, actions} from '../store/state';
import Rating from './rating';

export default class TagList extends React.Component {
  render () {
    const categories = this.categorize(this.props.books);
    return (<div className='taglist-container'>
      {this.tagsFromNotes(this.props.books)}
      <ul className='taglist-ul'>
        {categories.map(this.renderCategory.bind(this))}
      </ul>
      <ul className='numbered-list-container'>
        {$sortBy(b => -b.number, this.props.books.filter(b => b.number !== null)).map(this.renderNumbered)}
      </ul>
    </div>);
  }

  categorize (books) {
    const object = {};
    let book, categories;
    for (book of books) {
      categories = $info(book).categories.join(', ').toLowerCase();
      if (!object[categories]) object[categories] = [];
      object[categories].push(book);
    }
    return Object.keys(object).map(category => {
      return {category, books: object[category]};
    }).sort((x, y) => y.books.length - x.books.length); // desc
  }

  renderCategory ({category, books}) {
    const avgRating = $avgRating(books);
    return (<li className='category-title' key={category}>
      <span className='title'>
        {$toTitle(category)}
        <small> {books.filter(b => b.finished).length}/{books.length}</small>
        <small> {avgRating === null ? null : `★${avgRating}`}</small>
      </span>
      <ul className='books'>
        {books.map(this.renderBook)}
      </ul>
    </li>);
  }

  renderBook (book) {
    const title = $title(book);
    const info = $info(book);
    return (<li
      className='book-title'
      key={title}
      onClick={_=> update(actions.show, $id(book))}
    >
    {title}
    <Rating {...book} />
    <small>by {info.authors.join(', ')}</small>
    </li>);
  }

  renderNumbered (book) {
    return (<li key={$id(book)}>
      <span className='number'>#{book.number}</span>
      {$title(book)}
      <small>by {$info(book).authors.join(', ')}</small>
    </li>);
  }

  tagsFromNotes (books) {
    const toElem = ([tag, tags]) => {
      return (<div
        key={tag}
        className='hash-tag'
        onClick={e => update(actions.showHashTag, tag)}
      >
        {tag} <small>{tags.length}</small>
      </div>);
    };

    const items = books
      ::map($notesLIst)
      ::compact()
      ::map(notes => notes.filter(n => n.includes('#')))
      ::reject(empty)
      ::flatten()
      ::map(note => note.match(/(^|\s)(#[a-z\d-]+)/ig))
      ::flatten()
      ::group()
      ::entries()
      ::sorted(([_, tags]) => -tags.length)
      ::to(Array)

    return (<div className='hash-tags-container'>
      {items.map(toElem)}
    </div>);
  }
}

