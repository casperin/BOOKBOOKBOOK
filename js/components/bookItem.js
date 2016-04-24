import React from 'react';
import classname from 'classname';
import {$info} from '../util/book';
import Rating from './rating';

export default props => {
  const klass = classname('book-item-container', {
    reading: props.started && !props.finished && !props.abandoned,
    exlibris: props.exLibris,
    finished: !!props.finished
  });
  const rating = props.showRating ? <Rating {...props} /> : null;
  return (<li
    onClick={props.onClick}
    className={klass}
  >
    <div className='cover-container'>
      <img src={$info(props).imageLinks.thumbnail} className='cover' />
    </div>
    {rating}
  </li>);
};
