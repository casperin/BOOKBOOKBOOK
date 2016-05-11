import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';

import createSagaMiddleware from 'redux-saga';
import sagas from './sagas/sagas';

// Components
import App from './components/App';
import Home from './components/home/Home';
import Timeline from './components/timeline/Timeline';
import Notes from './components/notes/Notes';
import Book from './components/book/Book';
import Tags from './components/tags/Tags';

// const thunk = require('redux-thunk');
import reducers from './reducers/reducers';
import {routerReducer} from 'react-router-redux';

const reducer = combineReducers({...reducers, routing: routerReducer});

// Store stuff
const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(sagas);

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <div className='wrapper'>
      <Router history={history}>
        <Route path={'/'} component={App}>
          <IndexRoute component={Home} />
          <Route path={'/tab/:tab'} component={Home} />
          <Route path={'/timeline'} component={Timeline} />
          <Route path={'/notes'} component={Notes} />
          <Route path={'/notes/:id'} component={Notes} />
          <Route path={'/book/:id'} component={Book} />
          <Route path={'/tags'} component={Tags} />
          <Route path={'/tags/:tag'} component={Tags} />
        </Route>
      </Router>
    </div>
  </Provider>,

  document.getElementById('mount')
);
