import * as actions from '../actions/books';
import {bookId} from '../util/book';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case 'BOOKS_UPDATE':
      return action.books;

    case 'BOOK_MODIFY':
      return state.map(book => bookId(book) === action.id
        ? {...book, ...action.modification}
        : book);

    case 'BOOKS_ADD':
      if (state.find(b => bookId(b) === bookId(action.book))) {
        return state;
      } else {
        return [
          ...state,
          action.book
        ];
      }

    case 'BOOKS_REMOVE':
      return state.filter(b => bookId(b) !== action.id);

    default:
      return state;
  }
};
