import React from 'react';
import {update, actions} from './store/state';

export default class Keyboard extends React.Component {
  render () {return null}
  componentWillMount () {
    document.addEventListener('keydown', this.onKeydown.bind(this));
  }

  onKeydown (e) {
    switch (e.code) {
      case 'KeyA':
        if (e.ctrlKey) update(actions.toggleAddBook, true);
      break;
      case 'Escape':
        if (this.props.ui.addBook.open) update(actions.toggleAddBook, false);
        else update(actions.escape);
      break;
    }
  }
}

