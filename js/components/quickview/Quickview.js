import React from 'react';
import {isRead, bookInfo, bookPhoto, bookCategory} from '../../util/book';
import {daysBetween, human} from '../../util/date';
import Rating from '../book/Rating';

class Quickview extends React.Component {
  constructor (props) {
    super(props);
    this.state = {show: false};
  }

  render () {
    return (<div
      className='quick-view-component'
      onMouseEnter={e => this.setState({show: true})}
      onMouseLeave={e => this.setState({show: false})}
      >
      {this.props.children}
      {this.renderView(this.props.book)}
    </div>);
  }

  renderView (book) {
    if (!this.state.show) return null;

    const info = bookInfo(book);

    return (<div className='quick-view-container'>
      <div className='left'>
        <img src={bookPhoto(book)} />
        <Rating rating={book.rating} />
      </div>

      <div className='right'>
        <div className='title'>{info.title}</div>
        <div className='authors'>{info.authors.join(', ')}</div>
        <div className='category-pagecount'>{bookCategory(book)}, {info.pageCount} pages.</div>
        {this.extra(book)}
      </div>
    </div>);
  }

  extra (book) {
    if (!isRead(book) && book.bought) return <div className='extra'>Bought {human(book.bought)}</div>;

    if (book.abandoned) return <div className='extra'>Abandoned after {book.abandoned} pages on {human(book.finished)}.</div>;

    if (book.finished) return <div className='extra'>Finished {human(book.finished)}.</div>;
  }
}

export default Quickview;

