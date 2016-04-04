import React from 'react';
import QuickStats from './quickstats';
import FilterBooks from './filterbooks';
import AddBook from './addBook';

export default class BookListHeader extends React.Component {
  render () {
    return (<div className='book-list-header'>
      <FilterBooks filter={this.props.ui.filter} filterString={this.props.ui.filterString} />
      <AddBook {...this.props.ui.addBook} />
      <QuickStats {...this.props} showLink={true} />
    </div>);
  }
}
