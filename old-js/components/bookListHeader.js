import React from 'react';
import QuickStats from './quickstats';
import FilterBooks from './filterbooks';
import AddBook from './addBook';
import {update, actions} from '../store/state';

export default class BookListHeader extends React.Component {
  render () {
    return (<div className='book-list-header'>
      <FilterBooks {...this.props.ui} />
      <AddBook {...this.props.ui.addBook} />
      <label>
        <input
          type='checkbox'
          checked={this.props.ui.showRating}
          onClick={e => update(actions.toggleRating)}
        />
        Show rating
      </label>
      <QuickStats {...this.props} showLink={true} />
    </div>);
  }
}
