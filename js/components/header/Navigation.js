import React from 'react';
import {Link} from 'react-router';
import cx from 'classname';

export default ({location}) => {
  const pathname = location && location.pathname || '';
  return (<div className='navigation-component'>
    <Link to='/' className={cx({active: pathname === '/' || pathname.substr(0, 5) === '/tab/'})}>Books</Link>
    <Link to='/timeline' className={cx({active: pathname.substr(0, 9) === '/timeline'})}>Timeline</Link>
    <Link to='/notes' className={cx({active: pathname.substr(0, 6) === '/notes'})}>Notes</Link>
    <Link to='/tags' className={cx({active: pathname.substr(0, 5) === '/tags'})}>Tags</Link>
  </div>);
}
