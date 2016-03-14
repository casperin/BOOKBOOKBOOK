import actions from './actions';
import {$makeBook} from '../util/books';
import reducer from './reducer';
import xhr from 'xhr';
import debounce from 'debounce';
import * as api from './api';

let initialState = {
  "books": [],
  "ui": {
    "addBook": {
      "open": false
    }
  },
  "show": null
}

let state = initialState;

const subscribers = new Set();

const subscribe = fn => subscribers.add(fn);

const update = (action, data) => {
  sync(action, data);
  stating(reducer(action, data, state))
}

const stating = _state => {
  state = _state;
  subscribers.forEach(subscriber => subscriber(state));
}

export {
  subscribe,
  initialState,
  update,
  actions,
};

api.getBooks((err, books) => {
  if (err) throw err;
  update(actions.setBooks, JSON.parse(books));
});

const sync = (action, data) => {
  if (action === actions.escape) api.saveEditedBook(state.books[state.show]);
  if (action === actions.addBook) api.saveAddedBook($makeBook(data));
  if (action === actions.removeBook) api.saveRemoveBook(data);
}
