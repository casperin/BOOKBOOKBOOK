import React from 'react';
import {connect} from 'react-redux';
import Header from '../header/Header';
import SummaryTable from './SummaryTable';
import CategoryStats from './CategoryStats';

class Stats extends React.Component {
  render () {
    if (!this.props.books) return null;

    return (<div className='stats-component'>
      <Header location={this.props.location} />
      <div className='stats-wrapper'>
        <SummaryTable />
        <hr />
        <CategoryStats />
      </div>
    </div>);
  }
}

const mapStateToProps = state => {
  if (!state.books.length) return {};
  return {books: state.books};
};

export default connect(mapStateToProps)(Stats);
