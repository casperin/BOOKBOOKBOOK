import React from 'react';
import {connect} from 'react-redux';
import cx from 'classname';
import {Link} from 'react-router';

const BooksTabs = ({tab, modifyBooksOverview}) => {
  return (<div className='books-tabs-component'>
    <Link className={cx({active: tab === 'all'})} to='/'>All</Link>
    <Link className={cx({active: tab === 'read'})} to='/tab/read'>Read</Link>
    <Link className={cx({active: tab === 'unread'})} to='/tab/unread'>Unread</Link>
    <Link className={cx({active: tab === 'owned'})} to='/tab/owned'>Owned</Link>
  </div>);
};

const mapStateToProps = state => {
  return {
    // tab: state.components.booksOverview.tab
  };
}

export default connect(mapStateToProps)(BooksTabs);



