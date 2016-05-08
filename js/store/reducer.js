import actions from './actions';
import {swap, remove} from '../util/array';
import {$index, $makeBook} from '../util/books';

export default (action, data, state) => {
  switch (action) {
    case actions.setBooks:
      return {
        ...state,
        books: data
      };

    case actions.addBook:
      return {
        ...state,
        books: [
          $makeBook(data),
          ...state.books
        ]
      };

    case actions.show:
      return {
        ...state,
        show: data === null ? null : $index(state.books, data)
      };

    case actions.editBook:
      return {
        ...state,
        books: editBook(state.books, data)
      };

    case actions.removeBook:
      return {
        ...state,
        books: removeBook(state.books, data)
      };

    case actions.escape:
      return {
        ...state,
        show: null,
        showStats: false
      };

    case actions.toggleAddBook:
      return {
        ...state,
        ui: {
          ...state.ui,
          addBook: {
            ...state.ui.addBook,
            open: data
          }
        }
      };

    case actions.applyFilter:
      return {
        ...state,
        ui: {
          ...state.ui,
          filter: data
        }
      };

    case actions.applyFilterString:
      return {
        ...state,
        ui: {
          ...state.ui,
          filterString: data
        }
      };

    case actions.toggleRating:
      return {
        ...state,
        ui: {
          ...state.ui,
          showRating: !state.ui.showRating
        }
      };

    case actions.showHashTag:
      return {
        ...state,
        ui: {
          ...state.ui,
          showHashTag: data
        }
      };

    case actions.showStats:
      return {
        ...state,
        showStats: data
      };

    default:
      return state;
  }
};

const editBook = (books, data) => {
  const index = $index(books, data.id);
  if (index < 0) return books; // sanity check. Should never fail.
  const book = {
    ...books[index],
    [data.key]: data.value,
  }
  return swap(books, index, book);
};

const removeBook = (books, id) => {
  const index = $index(books, id);
  return remove(books, index);
};
