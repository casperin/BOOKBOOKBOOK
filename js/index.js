import React from 'react';
import ReactDOM from 'react-dom';
import BookList from './components/booklist';
import Show from './components/show';
import Stats from './components/stats';
import {subscribe, initialState} from './store/state';
import Keyboard from './keyboard';

class Main extends React.Component {
  constructor (props) {
    super(props);
    this.state = initialState;
  }

  componentWillMount () {
    subscribe(state => this.setState(state));
  }

  render () {
    return (<div className='wrapper'>
      {getPage(this.state)}
      <Keyboard {...this.state} />
    </div>);
  }
}

const getPage = state => {
  if (typeof state.show === 'number' && state.books[state.show])
    return <Show book={state.books[state.show]} index={state.show} />;

  if (state.showStats)
    return <Stats books={state.books} />;

  return <BookList {...state} />
};


ReactDOM.render(<Main />, document.querySelector('.container'));
