const express = require('express');
const router = express.Router();
const jsonfile = require('jsonfile');
const crypto = require('crypto');
const BOOKS_PATH = 'db.json';
const LOOKUP_PATH = 'lookup.json';
const SECRET_THING = 'Let us make books sexy again';

const getBooks = (path, cb) => {
  jsonfile.readFile('db/'+path+'.json', function(err, obj) {
    err ? cb(err)
        : cb(null, obj.books);
  })
}

const saveBooks = (path, books, cb) => {
  jsonfile.writeFile('db/'+path+'.json', {books}, cb);
}


/* GET home page. */
router.get('/', function(req, res, next) {
  if (!req.cookies.bbbToken) return res.render('login');
  res.render('index');
});

router.post('/get-token', function (req, res, next) {
  const hash = crypto.createHash('sha1').update(req.body.email + SECRET_THING).digest('hex');
  jsonfile.readFile(LOOKUP_PATH, function (err, obj) {
    if (err) return res.status(500).send({error: 'Could not look up stuff'});
    var token;
    for (const _token in obj) {
      if (obj[_token].hash !== hash) continue;
      token = _token;
      break;
    }
    if (!token) {
      token = crypto.randomBytes(48).toString('hex');
      obj[token] = {hash: hash, email: req.body.email};
      jsonfile.writeFile(LOOKUP_PATH, obj, err => {
        if (err) return res.status(500).send({error: 'Could not save your token :('});
        saveBooks(hash, [], err => {
          if (err) console.log('SHIT!');
        });
        res.cookie('bbbToken', token);
        res.status(200).send();
      });
    } else {
      res.cookie('bbbToken', token);
      res.status(200).send();
    }
  })
});

router.get('/books', function (req, res, next) {
  if (!req.cookies.bbbToken) return res.status(401);
  jsonfile.readFile(LOOKUP_PATH, function(err, obj) {
    getBooks(obj[req.cookies.bbbToken].hash, (err, books) => {
      if (err) return res.status(500).send({error: 'Loading books failed'});
      res.status(200).send(books);
    });
  });
});

router.post('/add-book', (req, res, next) => {
  if (!req.cookies.bbbToken) return res.status(401);
  const book = req.body;
  const id = $id(book);
  jsonfile.readFile(LOOKUP_PATH, function(err, obj) {
    getBooks(obj[req.cookies.bbbToken].hash, (err, books) => {
      if (err) return res.status(500).send({error: 'Loading books failed'});
      // Check if book already exists
      if (books.find(book => $id(book) === id)) return res.status(200).send(books);
      const newBooks = books.concat(book);
      saveBooks(obj[req.cookies.bbbToken].hash, newBooks, err => {
        if (err) return res.status(500).send({error: 'Saving books failed'});
        res.status(200).send(newBooks);
      });
    });
  });
});

router.post('/edit-book', (req, res, next) => {
  if (!req.cookies.bbbToken) return res.status(401);
  const editedBook = req.body;
  const id = $id(editedBook);
  jsonfile.readFile(LOOKUP_PATH, function(err, obj) {
    getBooks(obj[req.cookies.bbbToken].hash, (err, books) => {
      if (err) return res.status(500).send({error: 'Loading books failed'});
      books = books.map(book => $id(book) === id ? editedBook : book);
      saveBooks(obj[req.cookies.bbbToken].hash, books, err => {
        if (err) return res.status(500).send({error: 'Saving books failed'});
        res.status(200).send(books);
      });
    });
  });
});

router.post('/remove-book', (req, res, next) => {
  if (!req.cookies.bbbToken) return res.status(401);
  const id = req.body.id;
  jsonfile.readFile(LOOKUP_PATH, function(err, obj) {
    getBooks(obj[req.cookies.bbbToken].hash, (err, books) => {
      if (err) return res.status(500).send({error: 'Loading books failed'});
      books = books.filter(book => $id(book) !== id);
      saveBooks(obj[req.cookies.bbbToken].hash, books, err => {
        if (err) return res.status(500).send({error: 'Saving books failed'});
        res.status(200).send(books);
      });
    });
  });
});

module.exports = router;

const $id = book => book.details.items[0].id;
