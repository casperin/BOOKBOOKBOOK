import React from 'react';
import {connect} from 'react-redux';
import Header from '../header/Header';
import SummaryTable from './SummaryTable';
import CategoryStats from './CategoryStats';
import {isRead, bookInfo, bookId} from '../../util/book';
import filter from '../../util/filter';
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
          {this.props.books::filter(isRead)::sorted(b => -new Date(b.finished))::to(Array).map(book => {
            const info = bookInfo(book);
            const abandoned = book.abandoned
              ? `(abandoned after ~${book.abandoned} pages)`
              : null;
            return <li key={bookId(book)}>{info.title} - {info.authors.join(', ')} {abandoned}</li>;
          })}
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
