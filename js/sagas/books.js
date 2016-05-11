import {delay, takeEvery} from 'redux-saga';
import { call, cps, put } from 'redux-saga/effects';
import * as bookActions from '../actions/books';
import * as api from '../api/api';

function* error (text, err) {
  console.error(text, err);
  yield put({type: 'LOADING', text: null});
  yield put({type: 'ERROR', text});
  yield delay(5000);
  yield put({type: 'ERROR', text: ''});
}

function* fetchBooks (action) {
  let books;
  try {
    yield put({type: 'LOADING', text: 'Fetching books'});
    books = yield cps(api.get, 'books');
  } catch (e) {
    yield error('fetching your books failed', e);
  }
  if (books) yield put({type: 'BOOKS_UPDATE', books});
  yield delay(500);
  yield put({type: 'LOADING', text: null});
}

function* watchFetchBooks () {
  yield* takeEvery('BOOKS_FETCH', fetchBooks)
}

function* editBook ({id, modification}) {
  try {
    yield put({type: 'LOADING', text: 'Saving'});
    yield cps(api.post, 'edit-book', {id, modification});
  } catch (e) {
    yield error('modifying a book failed', e);
  } finally {
    yield delay(500);
    yield put({type: 'LOADING', text: null});
  }
}

function* watchEditBook () {
  yield* takeEvery('BOOK_MODIFY', editBook);
}

function* addBook (action) {
  try {
    yield put({type: 'LOADING', text: 'Saving'});
    yield cps(api.post, 'add-book', action.book);
  } catch (e) {
    yield error('adding a book failed', e);
  } finally {
    yield delay(500);
    yield put({type: 'LOADING', text: null});
  }
}

function* watchAddBooks () {
  yield* takeEvery('BOOKS_ADD', addBook);
}

function* removeBook ({id}) {
  try {
    yield put({type: 'LOADING', text: 'Saving'});
    yield cps(api.post, 'remove-book', {id});
  } catch (e) {
    yield error('removing a book failed', e);
  } finally {
    yield delay(500);
    yield put({type: 'LOADING', text: null});
  }
}

function* watchRemoveBook () {
  yield* takeEvery('BOOKS_REMOVE', removeBook);
}

export default function* () {
  yield [
    watchFetchBooks(),
    watchEditBook(),
    watchAddBooks(),
    watchRemoveBook()
  ];
}
