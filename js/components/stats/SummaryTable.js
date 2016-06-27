import React from 'react';
import {connect} from 'react-redux';
import length from '../../util/length';
import filter from '../../util/filter';
import map from '../../util/map';
import reduce from '../../util/reduce';
import to from '../../util/to';
import {bookInfo} from '../../util/book';
import {daysBetween, human} from '../../util/date';

class SummaryTable extends React.Component {
  render () {
    const {
      numberOfBooksRead,
      pagesRead,
      numberOfBooksReadLastWeek,
      numberOfPagesReadLastWeek,
      numberOfBooksReadLastMonth,
      numberOfPagesReadLastMonth,
      firstBookStarted,
      days,
      weeks,
      months,
      years
    } = this.props;

    return (<div className='stats-summary-table-component'>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Duration</th>
            <th>Books</th>
            <th>Pages</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Total</th>
            <td></td>
            <td>{numberOfBooksRead}</td>
            <td><em>{pagesRead}</em></td>
          </tr>

          <tr>
            <th>Day</th>
            <td>{days}</td>
            <td>{(numberOfBooksRead / days).toFixed(3)}</td>
            <td><em>{(pagesRead / days).toFixed(1)}</em></td>
          </tr>

          <tr>
            <th>Week</th>
            <td>{weeks.toFixed(2)}</td>
            <td><em>{(numberOfBooksRead / weeks).toFixed(2)}</em></td>
            <td>{(pagesRead / weeks).toFixed(0)}</td>
          </tr>

          <tr>
            <th>Last week</th>
            <td></td>
            <td>{numberOfBooksReadLastWeek.toFixed(2)}</td>
            <td>{numberOfPagesReadLastWeek}</td>
          </tr>

          <tr>
            <th>Month</th>
            <td>{months.toFixed(2)}</td>
            <td>{(numberOfBooksRead / months).toFixed(2)}</td>
            <td>{(pagesRead / months).toFixed(0)}</td>
          </tr>

          <tr>
            <th>Last month</th>
            <td></td>
            <td>{numberOfBooksReadLastMonth.toFixed(2)}</td>
            <td>{numberOfPagesReadLastMonth}</td>
          </tr>

          <tr>
            <th>Year</th>
            <td>{years.toFixed(2)}</td>
            <td>{(numberOfBooksRead / years).toFixed(0)}</td>
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

  const booksRead = books::filter(b => b.finished)::to(Array);

  const numberOfBooksRead = booksRead.length;

  const pagesRead = booksRead
    ::map(b => b.abandoned || bookInfo(b).pageCount)
    ::reduce((a, b) => Number(a) + Number(b), 0);

  const firstBookStarted = books
    ::map(b => b.started ? new Date(b.started) : Infinity)
    ::reduce((a, b) => a < b ? a : b);

  const booksLastWeek = booksRead
    ::filter(b => daysBetween(b.finished, new Date()) < 7)
    ::to(Array);

  const numberOfBooksReadLastWeek  = booksLastWeek.length;

  const numberOfPagesReadLastWeek = booksLastWeek
    ::map(b => b.abandoned || bookInfo(b).pageCount)
    ::reduce((a, b) => Number(a) + Number(b), 0);

  const booksLastMonth = booksRead
    ::filter(b => daysBetween(b.finished, new Date()) < 30)
    ::to(Array);

  const numberOfBooksReadLastMonth  = booksLastMonth.length;

  const numberOfPagesReadLastMonth = booksLastMonth
    ::map(b => b.abandoned || bookInfo(b).pageCount)
    ::reduce((a, b) => Number(a) + Number(b), 0);

  const days = daysBetween(firstBookStarted, new Date());
  const weeks = days / 7;
  const months = days / 30; // good enough
  const years = days / 365;

  return {
    numberOfBooksRead,
    pagesRead,
    numberOfBooksReadLastWeek,
    numberOfPagesReadLastWeek,
    numberOfBooksReadLastMonth,
    numberOfPagesReadLastMonth,
    firstBookStarted,
    days,
    weeks,
    months,
    years
  };
};

export default connect(mapStateToProps)(SummaryTable);
