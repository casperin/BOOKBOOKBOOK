import React from 'react';
import {Link} from 'react-router';
import Header from '../header/Header';
import BooksOverview from '../books/Overview';
import BooksFilter from '../books/Filter';
import BooksTabs from '../books/Tabs';
import AddBook from '../books/AddBook';

class Home extends React.Component {
  render () {
    return (<div className='home-component'>
      <Header location={this.props.location}>
        <BooksFilter />
        <BooksTabs tab={this.props.params.tab || 'all'} />
        <AddBook />
      </Header>

      <div className='books-overview-container'>
        <BooksOverview tab={this.props.params.tab || 'all'} />
      </div>
    </div>);
  }
}

export default Home;

