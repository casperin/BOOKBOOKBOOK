import React from 'react';
import {bookId, bookPhoto} from '../../util/book';
import {Link} from 'react-router';

export default ({book, link}) => {
  const id = bookId(book);
  const img = <img src={bookPhoto(book)} />;

  return link
    ? <Link className='book-cover-component' to={`/book/${id}`}>{img}</Link>
    : <div className='book-cover-component'>{img}</div>;
}

