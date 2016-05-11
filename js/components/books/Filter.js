import React from 'react';
import {connect} from 'react-redux';
import {modifyBooksOverview} from '../../actions/booksOverview';

const BooksFilter = ({filter, modifyBooksOverview}) => {
  return <input
    className='books-filter-component'
    value={filter}
    placeholder='Filter books'
    onChange={e => modifyBooksOverview({filter: e.target.value})}
  />;
};

const mapStateToProps = state => {
  return {
    filter: state.components.booksOverview.filter
  };
}

export default connect(mapStateToProps, {modifyBooksOverview})(BooksFilter);

