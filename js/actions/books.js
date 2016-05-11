
export const updateBooks = _ => ({type: 'BOOKS_FETCH'});

export const addBook = book => ({type: 'BOOKS_ADD', book});

export const removeBook = id => ({type: 'BOOKS_REMOVE', id});
