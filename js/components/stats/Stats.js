import React from 'react';
import {connect} from 'react-redux';
import Header from '../header/Header';
import SummaryTable from './SummaryTable';
import CategoryStats from './CategoryStats';
import {isRead, bookInfo, bookId} from '../../util/book';
import filter from '../../util/filter';
import map from '../../util/map';
import sorted from '../../util/sorted';
import to from '../../util/to';

class Stats extends React.Component {
  render () {
    if (!this.props.books) return null;

    return (<div className='stats-component'>
      <Header location={this.props.location} />
      <div className='stats-wrapper'>
        <SummaryTable />
        <hr />
        <CategoryStats />
        <hr />
        <ol reversed={true}>
          {this.props.books::filter(b => b.number)::sorted(b => -b.number)::map(book => {
            const info = bookInfo(book);
            return <li key={bookId(book)}>{info.title} - <em>{info.authors.join(', ')}</em></li>;
          })::to(Array)}
        </ol>
      </div>
    </div>);
  }
}

const mapStateToProps = state => {
  if (!state.books.length) return {};
  return {books: state.books};
};

export default connect(mapStateToProps)(Stats);
