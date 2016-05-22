import React from 'react';
import {connect} from 'react-redux';
import filter from '../../util/filter';
import map from '../../util/map';
import reduce from '../../util/reduce';
import to from '../../util/to';
import {bookInfo} from '../../util/book';
import {daysBetween, human} from '../../util/date';

class SummaryTable extends React.Component {
  render () {
    const {numberOfBooksRead, pagesRead, firstBookStarted, days, weeks, years} = this.props;

    return (<div className='stats-summary-table-component'>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Total</th>
            <th>Day</th>
            <th>Week</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Duration</th>
            <td></td>
            <td>{days}</td>
            <td>{weeks.toFixed(2)}</td>
            <td>{years.toFixed(2)}</td>
          </tr>
          <tr>
            <th>Books</th>
            <td>{numberOfBooksRead}</td>
            <td>{(numberOfBooksRead / days).toFixed(3)}</td>
            <td><em>{(numberOfBooksRead / weeks).toFixed(2)}</em></td>
            <td>{(numberOfBooksRead / years).toFixed(1)}</td>
          </tr>
          <tr>
            <th>Pages</th>
            <td><em>{pagesRead}</em></td>
            <td><em>{(pagesRead / days).toFixed(1)}</em></td>
            <td>{(pagesRead / weeks).toFixed(0)}</td>
            <td>{(pagesRead / years).toFixed(0)}</td>
          </tr>
        </tbody>
      </table>
    </div>);
  }
}

const mapStateToProps = state => {
  const books = state.books;

  if (!books.length) return {};

  const booksRead = books
    ::filter(b => b.finished || b.abandoned)
    ::to(Array);

  const numberOfBooksRead = booksRead.length;

  const pagesRead = booksRead
    ::map(b => b.abandoned || bookInfo(b).pageCount)
    ::reduce((a, b) => Number(a) + Number(b));

  const firstBookStarted = books
    ::map(b => b.started ? new Date(b.started) : Infinity)
    ::reduce((a, b) => a < b ? a : b);

  const days = daysBetween(firstBookStarted, new Date());
  const weeks = days / 7;
  const years = days / 365;

  return {numberOfBooksRead, pagesRead, firstBookStarted, days, weeks, years};
};

export default connect(mapStateToProps)(SummaryTable);
