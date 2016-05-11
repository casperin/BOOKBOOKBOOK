import xhr from 'xhr';

export const getBooks = cb => {
  xhr({url: '/books'}, (err, req, books) => {
    cb(err, books);
  });
};

export const saveEditedBook = book => {
  if (!book) return;
  xhr({
    headers: {'Content-Type': 'application/json'},
    url: '/edit-book',
    method: 'POST',
    body: JSON.stringify(book)
  }, (err, res, body) => {
    if (err) throw err;
    // We don't really care about the response as long as it's not throwing.
  });
};

export const saveAddedBook = book => {
  xhr({
    headers: {'Content-Type': 'application/json'},
    url: '/add-book',
    method: 'POST',
    body: JSON.stringify(book)
  }, (err, res, body) => {
    if (err) {
      console.error(err);
      throw err;
    }
  });
};

export const saveRemoveBook = id => {
  xhr({
    headers: {'Content-Type': 'application/json'},
    url: '/remove-book',
    method: 'POST',
    body: JSON.stringify({id})
  }, (err, res) => {
    if (err) {
      console.error(err);
      throw err;
    }
  });
};

