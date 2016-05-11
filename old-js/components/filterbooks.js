import React from 'react';
import {update, actions} from '../store/state';

export default class FilterBooks extends React.Component {
  render () {
    return (<div className='filter-books-container'>
      <select value={this.props.filter} onChange={this.applyFilter}>
        <option value='all'>All</option>
        <option value='unread'>Unread</option>
        <option value='reading'>Reading</option>
        <option value='finished'>Finished</option>
        <option value='exLibris'>Ex Libris</option>
        <option value='abandoned'>Abandoned</option>
        <option value='5-stars'>5 stars</option>
        <option value='4-stars'>4 stars</option>
        <option value='3-stars'>3 stars</option>
        <option value='2-stars'>2 stars</option>
        <option value='1-stars'>1 stars</option>
        <option value='unrated'>Unrated</option>
      </select>

      <input
        className='filter-string-books'
        onChange={this.applyFilterString}
        placeholder='filter Title or author'
        value={this.props.filterString}
      />
    </div>);
  }

  applyFilter (e) {
    update(actions.applyFilter, e.target.value);
  }

  applyFilterString (e) {
    update(actions.applyFilterString, e.target.value);
  }
}

