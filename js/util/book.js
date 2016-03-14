
export const $info = book => book.details.items[0].volumeInfo;
export const $title = book => book.details.items[0].volumeInfo.title;
export const $isbn = book => {
  const isbn = $info(book).industryIdentifiers.find(id => id.type === 'ISBN_10')
  return isbn ? isbn.identifier : '-';
}
export const $id = book => book.details.items[0].id;
