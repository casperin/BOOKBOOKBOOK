import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {isRead, bookCategory, bookInfo, bookPhoto, bookId} from '../../util/book';
import Quickview from '../quickview/Quickview';
import filter from '../../util/filter';
import group from '../../util/group';
import map from '../../util/map';
import entries from '../../util/entries';
import to from '../../util/to';
import sorted from '../../util/sorted';
import reduce from '../../util/reduce';


const avgRating = books => books::map(b => b.rating)::reduce((a, b) => a + b) / books.length;

class CategoryStats extends React.Component {
  render () {
    return (<div className='category-stats-component'>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>☆</th>
            <th>Pages</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.props.categories.map(([category, books]) => {
            return (<tr key={category}>
              <th>{category}</th>
              <td>{avgRating(books).toFixed(1)}</td>
              <td>{books.reduce((a, b) => a + bookInfo(b).pageCount, 0)}</td>
              <td className='non-data'>
                {books.map(book => {
                  const src = bookPhoto(book);
                  const id = bookId(book);
                  const title = bookInfo(book).title;

                  return (<Quickview book={book} key={id}>
                    <Link to={`/book/${id}`}><img src={src} /></Link>
                  </Quickview>);
                })}
              </td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>);
  }
}

const mapStateToProps = state => {
  const categories = state.books
    ::filter(isRead)
    ::group(bookCategory)
    ::entries()
    ::sorted(([cat, books]) => -avgRating(books))
    ::map(([cat, books]) => [cat, books::sorted(b => -new Date(b.finished))::to(Array)])
    ::to(Array);

  return {categories};
};

export default connect(mapStateToProps)(CategoryStats);


