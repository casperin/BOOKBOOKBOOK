import React from 'react';
import classname from 'classname';
//import getThumb from '../getThumb';

export default props => {
  const info = props.details.items[0].volumeInfo;
  const klass = classname('book-item-container', {
    reading: props.started && !props.finished && !props.abandoned,
    exlibris: props.exLibris,
    finished: !!props.finished
  });
  return (<li
    title={info.title}
    onClick={props.onClick}
    className={klass}
  >
    <img src={info.imageLinks.thumbnail} className='cover' />
  </li>);
};
