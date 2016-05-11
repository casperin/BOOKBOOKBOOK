import books from './books';

export default function* () {
  yield [
    books()
  ];
}

