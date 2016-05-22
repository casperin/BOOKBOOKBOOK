import React from 'react';
import {bookId, bookPhoto} from '../../util/book';
import {Link} from 'react-router';

export default ({book, meta, link}) => {
  const id = bookId(book);
  const img = <img src={bookPhoto(book)} />;
  meta = meta ? <div className='meta'>{meta}</div> : null;

  return link
    ? <Link className='book-cover-component' to={`/book/${id}`}>{img}{meta}</Link>
    : <div className='book-cover-component'>{img}{meta}</div>;
}

