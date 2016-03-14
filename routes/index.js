var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile');
var BOOKS_PATH = 'db.json';

const getBooks = cb => {
  jsonfile.readFile(BOOKS_PATH, function(err, obj) {
    err ? cb(err)
        : cb(null, obj.books);
  })
}

const saveBooks = (books, cb) => {
  jsonfile.writeFile(BOOKS_PATH, {books}, cb);
}


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/books', function (req, res, next) {
  getBooks((err, books) => {
    if (err) return res.status(500).send({error: 'Loading books failed'});
    res.status(200).send(books);
  });
});

router.post('/add-book', (req, res, next) => {
  const book = req.body;
  const id = $id(book);
  getBooks((err, books) => {
    if (err) return res.status(500).send({error: 'Loading books failed'});
    // Check if book already exists
    if (books.find(book => $id(book) === id)) return res.status(200).send(books);
    const newBooks = books.concat(book);
    saveBooks(newBooks, err => {
      if (err) return res.status(500).send({error: 'Saving books failed'});
      res.status(200).send(newBooks);
    });
  });
});

router.post('/edit-book', (req, res, next) => {
  const editedBook = req.body;
  const id = $id(editedBook);
  getBooks((err, books) => {
    if (err) return res.status(500).send({error: 'Loading books failed'});
    books = books.map(book => $id(book) === id ? editedBook : book);
    saveBooks(books, err => {
      if (err) return res.status(500).send({error: 'Saving books failed'});
      res.status(200).send(books);
    });
  });
});

router.post('/remove-book', (req, res, next) => {
  const id = req.body.id;
  getBooks((err, books) => {
    if (err) return res.status(500).send({error: 'Loading books failed'});
    books = books.filter(book => $id(book) !== id);
    saveBooks(books, err => {
      if (err) return res.status(500).send({error: 'Saving books failed'});
      res.status(200).send(books);
    });
  });
});

module.exports = router;

const $id = book => book.details.items[0].id;
