import React from 'react';
import {connect} from 'react-redux';
import {updateBooks} from '../actions/books';

class App extends React.Component {
  componentWillMount () {
    this.props.updateBooks();
  }

  render () {
    return (<div className='app-component'>
      {this.props.children}
    </div>);
  }
}

export default connect(null, {updateBooks})(App);

