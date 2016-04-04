import React from 'react';
import {$info, $id, $title} from '../util/book';
import {$toTitle} from '../util/string';
import {$sortBy} from '../util/array';
import {update, actions} from '../store/state';
import Rating from './rating';

export default class TagList extends React.Component {
  render () {
    const categories = this.categorize(this.props.books);
    return (<div className='taglist-container'>
      <ul className='taglist-ul'>
        {categories.map(this.renderCategory.bind(this))}
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
    return (<li className='category-title' key={category}>
      <span className='title'>{$toTitle(category)} ({books.length})</span>
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
}

